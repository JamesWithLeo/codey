"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

interface IProduct {
  id: number;
  name: string;
  category: Category;
  price: string;
  description: string;
  thumbnail: string;
  otherUrl: string[];
  brand: string;
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  sales: number;
}
export default function Card({ data: product }: { data: IProduct }) {
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
