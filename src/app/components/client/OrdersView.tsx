"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, Grid2X2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderCard, { type OrderCardData } from "./OrderCard";

type SortMode = "newest" | "oldest";
type ViewMode = "grid" | "list";

export default function OrdersView({ orders }: { orders: OrderCardData[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsCompactViewport(window.innerWidth < 768);
    };

    updateViewport();
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompactViewport(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isCompactViewport) {
      setViewMode("list");
    }
  }, [isCompactViewport]);

  const sortedOrders = useMemo(() => {
    const sorted = [...orders];

    sorted.sort((left, right) => {
      const leftDate = new Date(left.createdAt).getTime();
      const rightDate = new Date(right.createdAt).getTime();
      return sortMode === "newest"
        ? rightDate - leftDate
        : leftDate - rightDate;
    });

    return sorted;
  }, [orders, sortMode]);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 ">
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Your recent orders
          </p>
          <p className="text-sm text-zinc-500">
            Sorted{" "}
            {sortMode === "newest"
              ? "from newest to oldest"
              : "from oldest to newest"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-zinc-600">
            <ArrowDownUp className="h-4 w-4" />
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>

          {!isCompactViewport ? (
            <div className="flex items-center rounded-full border border-border/60 bg-background p-1">
              <Button
                type="button"
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 px-3"
              >
                <Grid2X2 className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button
                type="button"
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
          ) : (
            <div className="rounded-full border border-border/60 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-600">
              List view
            </div>
          )}
        </div>
      </div>

      <div
        className={
          viewMode === "list"
            ? "flex flex-col gap-4"
            : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        }
      >
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
