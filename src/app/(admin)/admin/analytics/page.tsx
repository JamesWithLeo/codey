import { prisma } from "@/src/prisma";
import AdminAnalyticsClient from "@/src/app/components/client/admin/AdminAnalyticsClient";

export default async function AnalyticsPage() {
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
    <AdminAnalyticsClient
      initialProducts={serializedProducts}
      initialOrders={serializedOrders}
    />
  );
}
