import { prisma } from "@/src/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { isValidOrderItem } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      break;

    case "POST":
      const order = req.body as any;
      const id = req.body.id;
      if (!id || Number.isNaN(id))
        return res.status(400).json({ ok: 0, error: "Invalid id" });

      if (!isValidOrderItem(order))
        return res
          .status(400)
          .json({ ok: 0, error: "Invalid order", body: req.body });

      const insertedOrder = await prisma.order.create({
        data: {
          user_id: id,
          totalAmount: 299.99, // Total for the entire order
          isPaid: true,
          orderItems: {
            create: [
              {
                ...order,
                subtotal: 0,
                total_price: 0,
                quantity: 1,
                pricePerUnit: 1,
                product_id: 1,
              },
            ],
          },
        },
        include: { orderItems: true },
      });
      res.status(200).json({ ok: 1, insertedOrder });
      break;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
}
