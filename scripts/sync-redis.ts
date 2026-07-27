import { prisma } from "@/src/prisma";
import { redis } from "@/lib/redis/redis";

async function Main() {
  const products = await prisma.product.findMany();

  const pipeline = redis.pipeline();

  for (const product of products) {
    const productId = `product:${product.id}`;
    const timestamp = product.createdAt.getTime();
    // Score for sorting (newest first)

    // Save product data as JSON or Hash
    pipeline.hset(productId, {
      ...product,
    });
    // global product
    pipeline.zadd("products:index", { score: timestamp, member: productId });

    //  Add to category-specific sorted set index
    const categoryKey = `products:category:${product.category.toLowerCase()}`;
    pipeline.zadd(categoryKey, { score: timestamp, member: productId });
  }
  await pipeline.exec();
  console.log(`Successfully synced ${products.length} products to Redis!`);
}

Main().catch(console.error);
