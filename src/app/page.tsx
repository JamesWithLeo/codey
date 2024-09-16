import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import ProductList from "./components/client/productList";
import SkeletonCard from "./components/server/skeletonCard";
import Pagination from "./components/client/pagination";
import { auth } from "@/authOptions";
const prisma = new PrismaClient();

async function getProduct({ limit, skip }: { limit: number; skip: number }) {
  const products = await prisma.product.findMany({
    take: limit,
    skip: skip,
  });
  return products;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let page: number;
  const currentPage = parseInt(searchParams.page);
  if (isNaN(currentPage)) page = 0;
  else page = currentPage;
  const limit = 10;
  const products = getProduct({ limit: limit, skip: page });
  const productLength = (await products).length;

  const session = await auth();
  console.log("session:", session?.user);
  return (
    <main className="w-full py-2 h-full flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <Suspense fallback={<SkeletonCard />}>
          <>
            <ProductList promise={products} />
          </>
        </Suspense>
      </div>
      {productLength ? <Pagination isEnd={productLength !== 0} /> : null}
    </main>
  );
}
