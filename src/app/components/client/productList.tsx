"use client";
import Card from "./card";
import { use } from "react";

export default function ProductList({ promise }: { promise: Promise<any> }) {
  const products = use(promise); // This will resolve the promise when ready

  return (
    <>
      {products.map((product: any) => (
        <Card key={product.id} object={product} />
      ))}
    </>
  );
}
