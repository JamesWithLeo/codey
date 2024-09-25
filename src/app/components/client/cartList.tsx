import { CartItem } from "@prisma/client";
import CartCard from "./cartCard";

export default function CartList({
  CartItems,
}: {
  CartItems: CartItem[] | null;
}) {
  return (
    <>
      {CartItems && CartItems.length
        ? CartItems.map((item) => {
            return <CartCard cartItem={item} key={item.id} />;
          })
        : null}
    </>
  );
}
