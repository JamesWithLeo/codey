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
    <section className="w-full h-96 rounded shadow">
      <h1>Hammer</h1>
    </section>
  );
}
