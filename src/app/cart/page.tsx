import { prisma } from "@/src/prisma";
import { redirect } from "next/navigation";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import CartPanel from "@/src/app/components/client/cartPanel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const sans = DM_Sans({ style: "normal", subsets: [] });
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

async function FetchCart(uid: string) {
  const cart = await prisma.cart.findFirst({ where: { user_id: uid } });
  if (!cart) return null;

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
    <div className="w-full flex h-full   lg:min-h-dvh items-start    justify-center  ">
      <div className="w-full h-full  flex max-w-7xl  flex-col  items-center justify-center">
        <div className="breadcrumbs  self-start   ">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {cart && cart.length > 0 ? (
          <>
            <CartPanel cartItem={cart} />
          </>
        ) : (
          <EmptyCartView />
        )}
      </div>
    </div>
  );
}

const EmptyCartView = () => {
  return (
    <div
      className={`   h-full   w-full  flex items-center justify-center px-6 ${sans.className}`}
    >
      <div className="max-w-md  text-center flex flex-col items-center">
        {/* Shopping Themed Icon Container */}
        <div className="bg-amber-100 p-4  rounded-full text-amber-600 mb-6 border border-amber-200 shadow-sm">
          <ShoppingCart className="h-12 w-12 stroke-[1.5]" />
        </div>

        {/* Dynamic Status Pill */}
        <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
          Empty Cart
        </span>

        {/* Primary Alert Messaging */}
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Your cart is empty.
        </h1>

        {/* Informational Subtext */}
        <p className="mt-3 text-sm text-gray-500 max-w-sm">
          Before you can proceed to check out, you must add some products or
          components to your current shopping session.
        </p>

        {/* Store Navigation Link action blocks */}
        <div className="mt-8 max-w-xs w-full flex justify-center">
          <Button className="w-full gap-2  font-semibold" size="lg">
            <Link
              href={"/products"}
              className="w-full flex items-center justify-center gap-1"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Context Help Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
          <p className="text-xs text-gray-400">
            Missing items you previously added? Try logging back into your
            profile.
          </p>
        </div>
      </div>
    </div>
  );
};
