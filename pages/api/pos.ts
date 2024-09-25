import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma";
import { TRANSACTION_SOURCE } from "@prisma/client";
import { omit } from "@/app/components/client/utils/omit";
import { isOrderValidForPOS } from "@/app/components/client/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      return;

    case "POST":
      // get the orders, check its format and data type.
      const orderItems = req.body.orders as any[];
      const areAllItemsValid = orderItems.every(isOrderValidForPOS);
      if (!areAllItemsValid) {
        return res.status(400).json({ ok: 0, error: "Invalid order data" });
      }

      const newItems = orderItems.map((value) => {
        const product_id = value.id;
        const product_name = value.name;
        const product = omit(value, ["id", "name"]);
        return { ...product, product_id, product_name };
      });

      const productItem = await prisma.transaction.create({
        data: {
          source: TRANSACTION_SOURCE.POS,
          orderItems: { create: newItems },
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
