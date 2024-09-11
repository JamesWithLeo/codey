import Image from "next/image";
import Link from "next/link";
import Card from "./components/client/card";

import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import ProductList from "./components/client/productList";
import SkeletonCard from "./components/client/skeletonCard";
const prisma = new PrismaClient();

async function getProduct() {
  const products = await prisma.product.findMany();
  return products;
}
export default async function Home() {
  const products = getProduct();
  return (
    <main className="w-full my-2 h-dvh flex px-8 flex-col items-center justify-center">
      <div className="h-full max-w-7xl grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Suspense fallback={<SkeletonCard />}>
          <>
            <ProductList promise={products} />
          </>
        </Suspense>
      </div>
    </main>
  );
}
