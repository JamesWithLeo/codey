import { auth } from "@/authOptions";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import CartPanel from "../components/client/cartPanel";
const sans = DM_Sans({ style: "normal", subsets: [] });

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

  const cart = await FetchCart(Auth.user.id);
  return (
    <main className="w-full py-2 h-full flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="breadcrumbs text-xs self-start">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/cart"}>Cart</Link>
          </li>
        </ul>
      </div>
      {cart ? (
        <>
          <CartPanel cartItem={cart} />
        </>
      ) : (
        <div className="h-dvh w-full max-w-7xl flex-col flex items-center justify-center">
          <h1 className={` ${sans.className} text-contrast`}>
            Your cart is empty.
          </h1>
        </div>
      )}
    </main>
  );
}
