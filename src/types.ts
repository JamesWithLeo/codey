import { product } from "@/src/generated/prisma/client";

export type CLIENT_PRODUCT = Omit<product, "price"> & {
  price: string;
};
