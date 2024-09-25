import PosProductList from "@/app/components/client/POS/posProductList";
import { prisma } from "@/prisma";

async function getProduct() {
  const product = await prisma.product.findMany({
    where: { isAvailable: true, stock: { not: 0 } },
  });
  return product;
}
export default async function page() {
  const products = await getProduct();

  function omit<T extends object, K extends keyof T>(
    obj: T,
    keysToRemove: K[],
  ): Omit<T, K> {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keysToRemove.includes(key as K)),
    ) as Omit<T, K>;
  }

  const serializedProduct = products.map((product) => {
    return omit(
      {
        ...product,
        price: parseFloat(product.price.toString()),
        quantity: 1,
        total_price: parseFloat(product.price.toString()),
      },
      [
        "createdAt",
        "description",
        "isAvailable",
        "isFeatured",
        "otherUrl",
        "updatedAt",
        "sales",
        "stock",
        "description",
        "category",
        "thumbnail",
      ],
    );
  });

  return (
    <main className="w-full h-dvh p-4">
      <PosProductList serializedProduct={serializedProduct} />
    </main>
  );
}
