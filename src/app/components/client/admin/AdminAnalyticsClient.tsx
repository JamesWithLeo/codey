"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  summarizeAnalytics,
  type AdminOrderSummary,
  type AdminProductSummary,
} from "./adminDashboard.utils";

type AdminAnalyticsClientProps = {
  initialProducts: AdminProductSummary[];
  initialOrders: AdminOrderSummary[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminAnalyticsClient({
  initialProducts,
  initialOrders,
}: AdminAnalyticsClientProps) {
  const [products] = useState(initialProducts);
  const [orders] = useState(initialOrders);

  const analytics = useMemo(
    () => summarizeAnalytics(products, orders),
    [orders, products],
  );

  function exportCsv() {
    const rows = [
      ["name", "category", "price", "stock", "sales", "featured", "available"],
      ...products.map((product) => [
        product.name,
        product.category,
        String(product.price),
        String(product.stock),
        String(product.sales),
        product.isFeatured ? "yes" : "no",
        product.isAvailable ? "yes" : "no",
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codey-products.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/90 p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Analytics
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Revenue and stock reporting
          </h1>
        </div>
        <Button variant="outline" onClick={exportCsv}>
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Performance snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold">
                  {formatCurrency(analytics.totalRevenue)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Gross value across orders
                </p>
              </div>
              <Badge>{analytics.totalOrders} orders</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/70 p-3">
                <p className="text-2xl font-semibold">{analytics.availableCount}</p>
                <p className="text-xs text-muted-foreground">Available items</p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <p className="text-2xl font-semibold">{analytics.outOfStockCount}</p>
                <p className="text-xs text-muted-foreground">Out of stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Category mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.topCategories.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm"
              >
                <span className="capitalize">{item.category}</span>
                <span className="font-medium">{item.count} products</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="px-2 py-2">Order</th>
                  <th className="px-2 py-2">Value</th>
                  <th className="px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-2 py-3">#{order.id}</td>
                    <td className="px-2 py-3">
                      {formatCurrency(Number(order.totalAmount || 0))}
                    </td>
                    <td className="px-2 py-3">
                      <Badge variant="secondary">{String(order.status)}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
