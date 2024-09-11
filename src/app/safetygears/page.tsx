import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import SkeletonCard from "../components/server/skeletonCard";
import ProductList from "../components/client/productList";
const prisma = new PrismaClient();
async function getProduct() {
  const products = await prisma.product.findMany({
    where: { category: "safetygears" },
  });
  return products;
}
export default async function Page() {
  const products = getProduct();

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
