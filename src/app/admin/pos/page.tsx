import PosProductList from "@/app/components/client/POS/posProductList";
import { prisma } from "@/prisma";

async function getProduct() {
  const product = await prisma.product.findMany();
  return product;
}
export default async function page() {
  const products = await getProduct();
  const serializedProduct = products.map((product) => {
    return {
      ...product,
      price: parseFloat(product.price.toString()),
      quantity: 0,
    };
  });
  return (
    <main className="w-full h-full p-4">
      <PosProductList serializedProduct={serializedProduct} />
    </main>
  );
}
