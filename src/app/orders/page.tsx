import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, PackageCheck, ShoppingBag } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import OrdersView from "@/src/app/components/client/OrdersView";
import { prisma } from "@/src/prisma";

async function getOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: { user_id: userId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
    totalAmount: order.totalAmount.toString(),
    isPaid: order.isPaid,
    orderItems: order.orderItems.map((item) => ({
      quantity: item.quantity,
      product: item.product
        ? {
            name: item.product.name,
          }
        : null,
    })),
  }));
}

export default async function Page() {
  const AuthSession = await auth.api.getSession({
    headers: await headers(),
  });
  const { session, user } = { ...AuthSession };

  if (!session || !user) redirect("/login");

  const orders = await getOrders(user.id);

  return (
    <div className="w-full min-h-dvh border-t px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 ">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Your account
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
                Orders
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                Track every purchase, review recent deliveries, and jump
                straight to a specific order whenever you need it.
              </p>
            </div>
            <Button size="lg" className="gap-2  rounded-full">
              <Link href="/products">Continue shopping</Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {orders.length ? (
          <OrdersView orders={orders} />
        ) : (
          <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-zinc-900">
              No orders yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Once you place an order, it will appear here with a quick
              overview, payment status, and a direct link to the full details.
            </p>
            <Button className="mt-6 gap-2 rounded-full">
              <Link href="/products">
                Browse products
                <PackageCheck className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
