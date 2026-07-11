"use client";
import ProductCard from "./ProductCard";
import { DM_Sans } from "next/font/google";
import { product } from "@/src/generated/prisma/client";
const sans = DM_Sans({ style: "normal", subsets: [] });
import { CLIENT_PRODUCT } from "@/src/types";

export default function ProductList({ data }: { data: CLIENT_PRODUCT[] }) {
  const products = data;
  return (
    <>
      {products.length ? (
        <>
          {products.map((product: CLIENT_PRODUCT) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </>
      ) : null}

      {!products.length ? (
        <div className="h-dvh w-full flex items-center col-span-full flex-col justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="76"
            height="76"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z"></path>
          </svg>
          <h1 className={`${sans.className} font-semibold`}>No result</h1>
        </div>
      ) : null}
    </>
  );
}
