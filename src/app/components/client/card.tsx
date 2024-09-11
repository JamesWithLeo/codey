"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
export default function Card({ object }: { object: Product }) {
  const router = useRouter();
  function HandleViewProduct() {
    console.log("hello");
    router.push(`/p/${object.id}/`);
  }
  return (
    <section
      className="card card-compact w-full border rounded-sm hover:shadow-md border-gray-100 "
      onClick={HandleViewProduct}
    >
      {/* https://picsum.photos/200 */}
      <figure>
        <Image
          src={object.imageUrl}
          width={1000}
          height={1000}
          alt=""
          priority
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{object.name}</h1>
        <h1>${object.price}</h1>
        <div className="card-actions justify-end ">
          <button className="btn h-8 btn-sm" onClick={() => {}}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
