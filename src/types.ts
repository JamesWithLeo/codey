import { product } from "@/src/generated/prisma/client";

export type CheckOutItem = {
  subtotal: number;
  pricePerUnit: number;
  quantity: number;
  product_id: number;
  name: string;
};

export type CLIENT_PRODUCT = Omit<product, "price"> & {
  price: string;
};
