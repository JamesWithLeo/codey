import { Category, PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import ProductList from "../components/client/productList";
import SkeletonCard from "../components/server/skeletonCard";
const prisma = new PrismaClient();

export default async function Page({
  searchParams: params,
}: {
  searchParams: { [key: string]: string };
}) {
  let products;
  const category = params.category as Category;
  console.log(`Searching:${params}\ncategory: ${category}`);
  if (category) {
    products = prisma.product.findMany({
      where: {
        name: { contains: params.query, mode: "insensitive" },
        category: category,
      },
    });
  } else {
    products = prisma.product.findMany({
      where: {
        name: { contains: params.query, mode: "insensitive" },
      },
    });
  }

  return (
    <main className="min-h-dvh my-2 px-8 items-center flex flex-col">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl">
        <Suspense fallback={<SkeletonCard />}>
          <>
            <ProductList promise={products} />
          </>
        </Suspense>
      </div>
    </main>
  );
}
