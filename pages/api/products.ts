import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma";

interface IOrder {
  id: number;
  quantity: number;
  total_price: number;
}

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
      const newItems = orderItems.map((value) => {
        const product_id = value.id;
        const product = omit(value, ["id"]);
        return { ...product, product_id: product_id, user_id: id };
      });

      const productItem = await prisma.order.createMany({
        skipDuplicates: true,
        data: newItems,
      });
      res.status(200).json({ ok: 1, productItem });
      return;

    case "PUT":
      return;

    case "DELETE":
      return;
  }
}
