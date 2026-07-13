import { prisma } from "@/src/prisma";
import { redirect } from "next/navigation";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import CartPanel from "@/src/app/components/client/cartPanel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const sans = DM_Sans({ style: "normal", subsets: [] });

async function FetchCart(uid: string) {
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
  const AuthSession = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  // const Auth = await auth();
  const { session, user } = { ...AuthSession };
  if (!session || !user) redirect("/");

  const cart = await FetchCart(user.id);
  return (
    <main className="w-full  h-full flex  flex-col gap-2 items-center justify-center">
      <div className="breadcrumbs text-xs self-start px-4 md:px-8">
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
        <div className="h-dvh w-full max-w-7xl flex-col flex items-center px-4 md:px-8 justify-center">
          <h1 className={` ${sans.className} text-contrast`}>
            Your cart is empty.
          </h1>
        </div>
      )}
    </main>
  );
}
