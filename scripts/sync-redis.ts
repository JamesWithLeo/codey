import { prisma } from "@/src/prisma";
import { redis } from "@/lib/redis";

import { Category } from "@/src/generated/prisma/enums";

async function Main() {
  const products = await prisma.product.findMany({
    omit: { sales: true, createdAt: true, updatedAt: true },
  });

  const pipeline = redis.pipeline();

  for (const product of products) {
    pipeline.set(`product:${product.id}`, JSON.stringify(product));

    for (const cat in Category) {
      if (cat === product.category)
        pipeline.set(`collection:${cat}`, product.id);
    }
  }
  await pipeline.exec();
  console.log(`Successfully synced ${products.length} products to Redis!`);
}

Main().catch(console.error);
