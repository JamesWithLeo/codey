import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PackageCheck, ShoppingBag } from "lucide-react";
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
    <div className="w-full  px-4 h-full   sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl h-full flex-col gap-6">
        <div className="flex flex-col  gap-4">
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
        </div>

        {orders.length > 0 ? (
          <OrdersView orders={orders} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-8 text-center">
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
            <Button size="lg" className="mt-6 gap-2 rounded-full">
              <PackageCheck className="h-4 w-4" />
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
