import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderItem } from "@/src/generated/prisma/client";
import { OrderItemCreateManyInput } from "@/src/generated/prisma/models";

export function isValidCheckOutItems(
  items: any[],
): items is OrderItemCreateManyInput[] {
  return items.every(
    (i) =>
      typeof i.subtotal === "number" &&
      i.subtotal > 0 &&
      typeof i.quantity === "number" &&
      i.quantity >= 1 &&
      typeof i.product_id === "number" &&
      i.product_id > 0,
  );
}

export function isValidOrderItem(item: any): item is OrderItem {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "number" &&
    typeof item.quantity === "number" &&
    !Number.isNaN(item.quantity) &&
    typeof item.isPaid === "boolean" &&
    typeof item.product_id === "number" &&
    !Number.isNaN(item.product_id) &&
    typeof item.product_name === "string" &&
    typeof item.transaction_id === "number" &&
    !Number.isNaN(item.transaction_id) &&
    // Handle Decimal types safely (they can look like objects or strings at runtime)
    item.total_price !== undefined &&
    item.subtotal !== undefined &&
    item.pricePerUnit !== undefined
  );
}

export interface ICart {
  quantity: number;
  product_id: number;
}
export function isValidCartItem(item: any): item is ICart {
  return (
    typeof item.quantity === "number" &&
    !Number.isNaN(item.quantity) &&
    typeof item.product_id === "number" &&
    !Number.isNaN(item.product_id)
  );
}

export function isValidCartToUpdate(product: any): product is ICart {
  return (
    typeof product.id === "number" &&
    !Number.isNaN(product.id) &&
    typeof product.quantity === "number" &&
    !Number.isNaN(product.quantity)
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
