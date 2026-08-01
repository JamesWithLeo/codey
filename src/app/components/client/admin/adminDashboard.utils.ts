export type AdminProductSummary = {
  id: number;
  name: string;
  category: string;
  price: number | string;
  stock: number;
  sales: number;
  isAvailable: boolean;
  isFeatured: boolean;
  brand: string;
  description: string;
  thumbnail: string;
};

export type AdminOrderSummary = {
  id: number;
  totalAmount: number | string;
  status: string;
};

export function summarizeAnalytics(
  products: AdminProductSummary[],
  orders: AdminOrderSummary[],
) {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0,
  );
  const lowStockCount = products.filter((product) => product.stock < 5).length;
  const outOfStockCount = products.filter(
    (product) => product.stock === 0,
  ).length;
  const featuredCount = products.filter((product) => product.isFeatured).length;
  const availableCount = products.filter(
    (product) => product.isAvailable,
  ).length;

  const categoryMap = products.reduce<Record<string, number>>(
    (acc, product) => {
      const key = product.category || "others";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const topCategories = Object.entries(categoryMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    lowStockCount,
    outOfStockCount,
    featuredCount,
    availableCount,
    topCategories,
  };
}

export function parseBulkCreateInput(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return [parsed];
  } catch {
    // fall back to newline-delimited JSON
  }

  return trimmed
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}
