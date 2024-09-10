import Image from "next/image";
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  brand: string;
  isFeatured: boolean; // If you want to feature some products
}
export default function Card() {
  return (
    <section className="p-2 w-full h-96 rounded border border-gray-100">
      <Image
        src={"https://picsum.photos/200"}
        width={1000}
        height={1000}
        alt=""
      />
      <h1>Hammer</h1>

      <h1>$23.32</h1>
      <button className="btn h-8 btn-sm">Add to cart</button>
    </section>
  );
}
