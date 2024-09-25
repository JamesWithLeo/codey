import { isValidCartItem } from "@/app/components/client/utils/validation";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ ok: 1 });
    case "POST":
      const cartItem = JSON.parse(req.body);
      const user_id = cartItem.user_id;
      const item = cartItem.item;
      const isValidItem = isValidCartItem(item);
      if (!isValidItem)
        return res.status(200).json({ ok: 0, error: "Invalid item" });

      const cart = await prisma.cart.findFirst({ where: { user_id: user_id } });

      if (cart) {
        const addedItem = await prisma.cartItem.create({
          data: {
            quantity: item.quantity,
            product_id: item.product_id,
            cart_id: cart.id,
          },
        });
        return res.status(200).json({ ok: 1, addedItem });
      } else {
        const addedItem = await prisma.cart.create({
          data: {
            user_id,
            cartItems: {
              create: { quantity: item.quantity, product_id: item.product_id },
            },
          },
        });
        return res.status(200).json({ ok: 1, addedItem });
      }
    case "PUT":
      return res.status(200).json({ ok: 1 });
    case "DELETE":
      return res.status(200).json({ ok: 1 });
  }
}
