import { prisma } from "@/prisma";
import { Category } from "@prisma/client";
import { Suspense } from "react";
import ProductList from "../client/productList";
import Link from "next/link";
import RecommendedList from "../client/recommendedList";

export default async function Recomended({
  category,
  selectedProductId,
  selectedProductName,
}: {
  category: Category;
  selectedProductId: number;
  selectedProductName: string;
}) {
  const relatedProduct = prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: selectedProductName },
        },
        {
          category: category,
        },
      ],
      NOT: { id: selectedProductId },
    },
    take: 4,
  });
  return (
    <Suspense>
      <RecommendedList promise={relatedProduct} category={category} />
    </Suspense>
  );
}
