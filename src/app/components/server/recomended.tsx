import { prisma } from "@/prisma";
import { Category } from "@prisma/client";
import { Suspense } from "react";
import ProductList from "../client/productList";
import Link from "next/link";
import RecommendedList from "../client/recommendedList";

export default async function Recomended({
  category,
  selectedProductId,
}: {
  category: Category;
  selectedProductId: number;
}) {
  const relatedProduct = prisma.product.findMany({
    where: {
      category: category,
      NOT: { id: selectedProductId },
    },
    take: 4,
  });
  return (
    <main>
      <h1>Recommended</h1>
      <Suspense>
        <div className="h-96 w-full grid grid-cols-5 gap-2">
          <RecommendedList promise={relatedProduct} category={category} />
        </div>
      </Suspense>
    </main>
  );
}
