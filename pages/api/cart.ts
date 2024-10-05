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
      const cartLimit = 10;
      const cartItem = JSON.parse(req.body);

      const user_id = cartItem.user_id;

      const item = cartItem.item;

      const isValidItem = isValidCartItem(item);
      if (!isValidItem)
        return res.status(200).json({ ok: 0, error: "Invalid item" });
      const cart = await prisma.cart.findFirst({ where: { user_id: user_id } });

      if (cart) {
        const isFullCart = await prisma.cartItem.findMany({
          where: { cart_id: cart.id },
          take: cartLimit,
        });
        if (isFullCart.length === cartLimit) {
          return res.status(200).json({
            ok: 0,
            maxCart: true,
            error:
              "It looks like your cart is full! How about reviewing your items or finalizing your order?",
          });
        }
        const existingItem = await prisma.cartItem.findFirst({
          where: { product_id: item.product_id, cart_id: cart.id },
        });
        let addedItem;
        if (!existingItem) {
          addedItem = await prisma.cartItem.create({
            data: {
              quantity: item.quantity,
              product_id: item.product_id,
              cart_id: cart.id,
            },
          });
        } else {
          addedItem = await prisma.cartItem.update({
            where: {
              product_id: item.product_id,
              cart_id: cart.id,
              id: existingItem?.id,
            },
            data: {
              quantity: { increment: item.quantity + existingItem.quantity },
            },
          });
        }
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
      console.log(req.body);

      return res.status(200).json({ ok: 1, body: req.body });

    case "DELETE":
      const ids = JSON.parse(req.query.ids as string) as any[];
      const isValid = ids.every((id) => typeof id === "string");

      if (!isValid) {
        return res.status(400).json({ ok: 0, error: "contains invalid id" });
      }
      console.log(ids);
      const deletedItem = await prisma.cartItem.deleteMany({
        where: { id: { in: ids } },
      });
      return res.status(200).json({ ok: 1, deletedItem: deletedItem });
  }
}
