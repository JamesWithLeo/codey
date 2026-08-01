import { prisma } from "@/src/prisma";
import AdminOverviewClient from "@/src/app/components/client/admin/AdminOverviewClient";

export default async function DashboardPage() {
  const [products, orders] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));

  const serializedOrders = orders.map((order) => ({
    ...order,
    totalAmount: order.totalAmount.toString(),
  }));

  return (
    <AdminOverviewClient
      initialProducts={serializedProducts}
      initialOrders={serializedOrders}
    />
  );
}
