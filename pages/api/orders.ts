import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma";
import { IOrder } from "@/app/components/client/utils/validation";

function isValidOrder(order: any): order is IOrder {
  return (
    typeof order === "object" &&
    order !== null &&
    typeof order.id === "number" &&
    !Number.isNaN(order.id) &&
    typeof order.quantity === "number" &&
    !Number.isNaN(order.quantity) &&
    !Number.isNaN(order.total_price) &&
    typeof order.total_price === "number"
  );
}
function omit<T extends object, K extends keyof T>(
  obj: T,
  keysToRemove: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key as K)),
  ) as Omit<T, K>;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      return;

    case "POST":
      const id =
        !Number.isNaN(parseInt(req.body.id)) && typeof req.body.id === "number"
          ? parseInt(req.body.id)
          : null;
      if (!id) return res.status(400).json({ ok: 1, error: "Invalid id" });

      const orderItems = req.body.orders as any[];
      const areAllItemsValid = orderItems.every(isValidOrder);
      if (!areAllItemsValid) {
        return res.status(400).json({ ok: 0, error: "Invalid order data" });
      }

      const productItem = await prisma.transaction.create({
        data: {
          user_id: id,
          orderItems: { create: orderItems },
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
