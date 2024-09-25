import { auth } from "@/authOptions";
import { prisma } from "@/prisma";
import CartList from "../components/client/cartList";
import { redirect } from "next/navigation";

async function FetchCart(uid: number) {
  const cart = await prisma.cart.findFirst({ where: { user_id: uid } });
  if (!cart) return null;
  const cart_id = cart.id;

  await prisma.cartItem.findMany({ where: { cart_id } });
  const response = await prisma.cartItem.findMany({
    where: { cart_id: cart.id },
  });

  return response;
}
export default async function Page() {
  const Auth = await auth();
  if (!Auth || !Auth?.user) redirect("/");
  console.log(Auth.user.id);
  const cart = await FetchCart(Auth.user.id);
  return (
    <main className="w-full py-2 h-full flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-dvh w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <CartList CartItems={cart} />
      </div>
    </main>
  );
}
