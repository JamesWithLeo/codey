import { redis } from "./redis";
import { product } from "@/src/generated/prisma/client";

function mapRedisToProduct(data: Record<string, any>): product | null {
  if (!data || !data.id) return null;

  return {
    id: data.id,
    brand: data.brand,
    description: data.description,
    thumbnail: data.thumbnail,
    category: data.category,
    name: data.name,
    price: data.price,
    otherUrl: data.otherUrl ?? [],
    stock: data.stock,
    isFeatured: data.isFeatured,
    isAvailable: data.isAvailable,
    sales: data.sales ?? 0,

    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

const REQUIRED_PRODUCT_FIELDS = [
  "id",
  "name",
  "price",
  "thumbnail",
  "category",
  "stock",
] as const;

export async function getRedisProduct(id: number) {
  const redisProduct = await redis.hgetall(`product:${id}`);
  if (!redisProduct || Object.keys(redisProduct).length === 0) {
    return null;
  }

  const hasAllRequiredFields = REQUIRED_PRODUCT_FIELDS.every(
    (field) =>
      redisProduct[field] !== undefined && redisProduct[field] !== null,
  );

  if (!hasAllRequiredFields) {
    console.warn(
      `[Redis Cache Miss] Incomplete data for product:${id}. Falling back to DB.`,
    );
    return null;
  }

  return mapRedisToProduct(redisProduct);
}
