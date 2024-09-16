"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  thumbnail: string;
  stock: number;
  brand: string;
  isFeatured: boolean;
};
export default function Card({ object: product }: { object: product }) {
  const router = useRouter();
  function HandleViewProduct() {
    router.push(`/p/${product.id}/`);
  }
  return (
    <section
      className="card card-compact w-full max-h-96 h-full border rounded-sm hover:shadow-md border-gray-100 "
      onClick={HandleViewProduct}
    >
      <figure>
        <Image
          src={product.thumbnail}
          width={1000}
          height={1000}
          alt=""
          priority
        />
      </figure>
      <div className="p-2 md:p-4">
        <h1 className="card-title md:text-md">{product.name}</h1>
        <h1>${parseFloat(product.price).toFixed(2)}</h1>
        <div className="card-actions justify-end ">
          <button className="btn h-8 btn-xs " onClick={() => {}}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
