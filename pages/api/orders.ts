import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ok: 1 });
      break;
    case "POST":
      const id = parseInt(req.body.id, 10);
      const status = req.body.status as string;
      const quantity = parseInt(req.body.quantity, 10);
      const product_id = parseInt(req.body.product_id, 10);
      const user_id = parseInt(req.body.user_id, 10);

      console.log(user_id, quantity, product_id);
      res.status(200).json({ ok: 1, body: req.body });
      // prisma.order.create({
      //   data: {
      //     status: "",
      //     quantity: 1,
      //     total_price: 1,
      //     product_id: 1,
      //     user_id: 1,
      //   },
      // });
      break;
  }
}
