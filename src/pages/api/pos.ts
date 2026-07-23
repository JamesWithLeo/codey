import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/prisma";
import { isOrderValidForPOS } from "@/src/app/components/client/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      return;

    case "POST":
      const id = req.body.id;
      if (!id || typeof id !== "string")
        return res.status(400).json({ ok: 1, error: "Missing or Invalid id" });

      const orderItems = req.body.orders as any[];
      const areAllItemsValid = orderItems.every(isOrderValidForPOS);
      if (!areAllItemsValid) {
        return res.status(400).json({ ok: 0, error: "Invalid order data" });
      }

      const newItems = orderItems.map((value) => {
        const product_id = value.product_id;
        const product_name = value.product_name;
        return { ...value, product_id, product_name };
      });

      const productItem = await prisma.order.create({
        data: {
          user_id: id,
          totalAmount: 299.99, // Total for the entire order
          isPaid: true,

          orderItems: {
            create: [
              {
                ...newItems,
                subtotal: 0,
                quantity: 1,
                pricePerUnit: 1,
                product_id: 1,
              },
            ],
          },
        },
      });
      res.status(200).json({ ok: 1, productItem });
      return;

    case "PUT":
      return;

    case "DELETE":
      return;
  }
}
