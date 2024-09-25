"use client";

import { CartItem, product } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartCard({ cartItem }: { cartItem: CartItem }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product | null>(null);
  useEffect(() => {
    async function FetchProduct(id: number) {
      const response = await fetch(`/api/product/?id=${id}`);
      const data = await response.json();
      if (data.ok) {
        setProduct(data.product);
        setIsLoading(false);
      }
    }
    FetchProduct(cartItem.product_id);
  }, []);
  return (
    <div className="card card-compact w-full max-h-96 h-full border rounded-sm hover:shadow-md border-gray-100">
      {product ? (
        <>
          <figure>
            <Image
              src={product?.thumbnail ?? ""}
              width={1000}
              height={1000}
              alt=""
              priority
            />
          </figure>
          <div className="p-2 md:p-4">
            <Link href={`/p/${product.id}`} className="card-title md:text-md">
              {product?.name}
            </Link>
          </div>
        </>
      ) : // <div className="loading loading-bars" />
      null}
    </div>
  );
}
