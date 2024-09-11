import Image from "next/image";

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
  return (
    <section className="p-2 w-full h-96 rounded border border-gray-100">
      {/* https://picsum.photos/200 */}
      <Image src={object.imageUrl} width={1000} height={1000} alt="" priority />
      <h1>{object.name}</h1>
      <h1>${object.price}</h1>
      <button className="btn h-8 btn-sm">Add to cart</button>
    </section>
  );
}
