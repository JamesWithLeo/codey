import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/src/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const orderNumber = Number(orderId);

  const AuthSession = await auth.api.getSession({
    headers: await headers(),
  });
  const { session, user } = { ...AuthSession };

  if (!session || !user) redirect("/login");
  if (!Number.isInteger(orderNumber)) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderNumber },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || order.user_id !== user.id) notFound();

  const totalItems = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(order.totalAmount));

  return (
    <div className="w-full min-h-dvh  ">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/orders">
                    Order #{order.id}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Badge
            variant={order.isPaid ? "secondary" : "outline"}
            className={
              order.isPaid
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            }
          >
            {order.status}
          </Badge>
        </div>

        <Card className="overflow-hidden pt-0 rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <CardHeader className="border-b   border-zinc-100   px-6">
            <div className="flex flex-col  gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-zinc-900">
                  Order #{order.id}
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-zinc-500">
                  Placed on {formattedDate} • {totalItems} item
                  {totalItems === 1 ? "" : "s"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm">
                <PackageCheck className="h-4 w-4" />
                <span>{formattedAmount}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm text-zinc-600">
              <p className="font-medium text-zinc-900">Order summary</p>
              <p className="mt-1">
                This order is currently marked as {order.status.toLowerCase()}{" "}
                and{" "}
                {order.isPaid ? "has been paid" : "is still awaiting payment"}.
              </p>
            </div>

            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <Link
                  href={`/products/${item.product?.id}`}
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-medium hover:underline text-zinc-900">
                      {item.product?.name ?? "Product"}
                    </p>
                    <p className="text-sm text-zinc-500">
                      Qty {item.quantity} • Unit {formattedAmount}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(item.subtotal))}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
