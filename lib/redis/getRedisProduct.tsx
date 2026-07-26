import { product } from "@/src/generated/prisma/client";
import { redis } from "./redis";

export async function getRedisProduct({
  page,
  limit,
  query,
  category,
}: {
  page: number;
  limit: number;
  query?: string;
  category?: string;
}) {
  const startIndex = (page - 1) * limit;
  const stopIndex = startIndex + limit - 1;
  const indexKey = category
    ? `products:category:${category.toLowerCase()}`
    : "products:index";

  const totalItems = await redis.zcard(indexKey);
  const totalPages = Math.ceil(totalItems / limit);

  const keys = await redis.zrange<string[]>(indexKey, startIndex, stopIndex, {
    rev: true,
  });

  let rawProducts: product[] = [];
  if (keys.length > 0) {
    // Pipeline or mget to fetch hashes
    const pipeline = redis.pipeline();

    for (const key of keys) {
      pipeline.hgetall(key);
    }
    const results = await pipeline.exec<Record<string, unknown>[]>();

    // Filter out null/empty results and cast
    rawProducts = results.filter(
      (p): p is Record<string, unknown> =>
        p !== null && Object.keys(p).length > 0,
    ) as unknown as product[];
  }

  return {
    products: rawProducts.map((p) => ({ ...p, price: String(p.price ?? 0) })),
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      limit,
      currentCursor: startIndex,
      nextCursor: stopIndex,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      isEnd: rawProducts.length < limit,
    },
  };
}
