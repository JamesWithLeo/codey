import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type OrderCardData = {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: string | number;
  isPaid: boolean;
  orderItems: Array<{
    quantity: number;
    product?: {
      name?: string | null;
    } | null;
  }>;
};

export default function OrderCard({
  order,
  viewMode,
}: {
  order: OrderCardData;
  viewMode: "grid" | "list";
}) {
  const totalItems = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const itemSummary = order.orderItems
    .slice(0, 2)
    .map((item) => item.product?.name ?? "Item")
    .join(", ");

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(order.totalAmount));

  const statusLabel = order.status
    ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
    : "Pending";

  return (
    <Link href={`/orders/${order.id}`} className="block h-full">
      <Card className="group grid-rows-[1fr_min-content] grid h-full overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div
          className={
            viewMode === "list"
              ? "flex  flex-col items-center  md:flex-row md:items-stretch"
              : "flex flex-col items-center  "
          }
        >
          <CardHeader className="flex-1 w-full">
            <div className="flex  justify-center h-full w-full flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 ">
                <CardTitle className="line-clamp-1 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-700">
                  Order #{order.id}
                </CardTitle>
                <CardDescription className="mt-1 text-xs text-zinc-500">
                  Placed {formattedDate}
                </CardDescription>
              </div>
              <Badge
                variant={order.isPaid ? "secondary" : "secondary"}
                className={
                  order.isPaid
                    ? "border-emerald-200  bg-emerald-50 text-emerald-700"
                    : "border-amber-200   bg-amber-50 text-amber-700"
                }
              >
                {statusLabel}
              </Badge>
            </div>

            <div className="mt-3 space-y-2">
              <CardDescription className="line-clamp-2 text-sm leading-5 text-zinc-600">
                {itemSummary || "No items recorded yet"}
              </CardDescription>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span>
                  {totalItems} item{totalItems === 1 ? "" : "s"}
                </span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{formattedAmount}</span>
              </div>
            </div>
          </CardHeader>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 px-6 pb-0 py-3 text-sm text-zinc-500">
          <span>View details</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}
