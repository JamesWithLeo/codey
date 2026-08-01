"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  summarizeAnalytics,
  type AdminOrderSummary,
  type AdminProductSummary,
} from "./adminDashboard.utils";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type AdminOverviewClientProps = {
  initialProducts: AdminProductSummary[];
  initialOrders: AdminOrderSummary[];
};

export default function AdminOverviewClient({
  initialProducts,
  initialOrders,
}: AdminOverviewClientProps) {
  const analytics = summarizeAnalytics(initialProducts, initialOrders);

  return (
    <div className="space-y-5 w-full">
      <div className="rounded-2xl w-full border border-border/70 bg-background/90 p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              Control center
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              Admin dashboard
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Revenue, inventory, and catalog health in one view.
            </p>
          </div>
          <Badge variant="secondary">Live snapshot</Badge>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Revenue pulse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {formatCurrency(analytics.totalRevenue)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {analytics.totalOrders} orders processed
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Inventory health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/70 p-3">
                <p className="text-2xl font-semibold">
                  {analytics.totalProducts}
                </p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <p className="text-2xl font-semibold">
                  {analytics.lowStockCount}
                </p>
                <p className="text-xs text-muted-foreground">Low stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Catalog mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.topCategories.length > 0 ? (
              analytics.topCategories.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm"
                >
                  <span className="capitalize">{item.category}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No products yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
