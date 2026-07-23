import { auth } from "@/lib/auth";
import { isValidCartItem, isValidCheckOutItems } from "@/lib/utils";
import { prisma } from "@/src/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json(
      {
        error: "Invalid or missing user ID",
        message:
          "You must be authenticated or provide a valid user ID to perform this action.",
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  const isValidItems = isValidCheckOutItems(body);

  if (!isValidItems) {
    return NextResponse.json(
      {
        error: "Invalid request body",
        message:
          "The checkout items provided are formatted incorrectly or contain invalid product data.",
      },
      { status: 400 },
    );
  }

  try {
    const productIds = body.map((item) => item.product_id);
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        price: true,
      },
    });

    // Create a quick lookup map for efficiency: { "productId": 150.00 }
    const priceMap = new Map(dbProducts.map((p) => [p.id, Number(p.price)]));

    let totalAmount = 0;

    for (const item of body) {
      const truePrice = priceMap.get(item.product_id);

      // Safety check: If a product ID from the client doesn't exist in the DB
      if (truePrice === undefined) {
        return NextResponse.json(
          {
            error: "Unprocessable Entity",
            message: `Product ID ${item.product_id} not found.`,
          },
          { status: 422 },
        );
      }

      totalAmount += truePrice * item.quantity;
      item.pricePerUnit = truePrice;
    }

    const orderResult = await prisma.order.create({
      data: {
        user_id: userId,
        status: "pending",
        isPaid: false,
        totalAmount: totalAmount,
        orderItems: {
          createMany: {
            data: body,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, data: orderResult },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to process your order.",
      },
      { status: 500 },
    );
  }
}
