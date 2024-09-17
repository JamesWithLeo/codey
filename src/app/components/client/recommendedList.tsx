import { Category, product } from "@prisma/client";
import { use } from "react";
import Card from "./card";
import Link from "next/link";

export default function RecommendedList({
  promise,
  category,
}: {
  promise: Promise<product[]>;
  category: Category;
}) {
  const products = use(promise);
  return (
    <>
      {products.length ? (
        <>
          {products.map((product: product) => {
            const productSerialize = {
              ...product,
              price: product.price.toString(),
            };
            return <Card key={product.id} object={productSerialize} />;
          })}
          <Link
            href={`/`}
            className="flex items-center justify-center bg-gray-100"
          >
            See more
          </Link>
        </>
      ) : null}
    </>
  );
}
