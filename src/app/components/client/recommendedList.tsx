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
          <main className="flex gap-2 flex-col">
            <span className="flex justify-between">
              <h1>Recommended</h1>
            </span>
            <div className="h-full w-full grid grid-cols-2 grid-rows-1 md:grid-cols-4 gap-2">
              {products.map((product: product) => {
                const productSerialize = {
                  ...product,
                  price: product.price.toString(),
                };
                return <Card key={product.id} object={productSerialize} />;
              })}
            </div>
            <span className="flex flex-col">
              <Link
                href={`/${category}`}
                className="flex w-max btn btn-sm self-end items-center justify-center bg-gray-100"
              >
                See more
              </Link>
            </span>
          </main>
        </>
      ) : null}
    </>
  );
}
