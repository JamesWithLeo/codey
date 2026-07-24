import { prisma } from "@/src/prisma";
import { redis } from "@/lib/redis";

async function Main() {
  const products = await prisma.product.findMany();

  const pipeline = redis.pipeline();

  for (const product of products) {
    pipeline.set(`product:${product.id}`, JSON.stringify(product));

    if (product.category) {
      pipeline.sadd(`collection:${product.category}`, product.id);
    }
  }
  await pipeline.exec();
  console.log(`Successfully synced ${products.length} products to Redis!`);
}

Main().catch(console.error);
