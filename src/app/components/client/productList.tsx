"use client";
import Card from "./card";
import { use } from "react";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });
interface Product {
  id: Number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  brand: string;
  isFeatured: boolean; // If you want to feature some products
}
export default function ProductList({
  promise,
}: {
  promise: Promise<Product[]>;
}) {
  const products = use(promise); // This will resolve the promise when ready

  return (
    <>
      {products.length ? (
        <>
          {products.map((product: any) => (
            <Card key={product.id} object={product} />
          ))}
        </>
      ) : (
        <div className="absolute -translate-x-1/2 left-1/2 w-full h-full flex items-center flex-col justify-center text-gray-500">
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
      )}
    </>
  );
}
