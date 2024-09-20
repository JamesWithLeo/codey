import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface IOrder {
  user_id: number;
  quantity: number;
  total_price: number;
  product_id: number;
}

function isValidOrder(order: any): order is IOrder {
  return (
    typeof order.user_id === "number" &&
    !Number.isNaN(order.user_id) &&
    typeof order.quantity === "number" &&
    !Number.isNaN(order.quantity) &&
    typeof order.total_price === "number" &&
    !Number.isNaN(order.total_price) &&
    typeof order.product_id === "number" &&
    !Number.isNaN(order.product_id)
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      break;

    case "POST":
      const order = req.body as IOrder;

      if (!isValidOrder(order))
        return res
          .status(400)
          .json({ ok: 0, error: "Invalid order", body: req.body });

      const insertedOrder = await prisma.transaction.create({
        data: {
          user_id: order.user_id,
          orderItems: {
            create: [
              {
                total_price: order.total_price,
                quantity: order.quantity,
                product_id: order.product_id,
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
