import PosProductList from "@/src/app/components/client/POS/posProductList";
import { prisma } from "@/src/prisma";

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
        pricePerUnit: parseFloat(product.price.toString()),
        quantity: 1,
        subtotal: parseFloat(product.price.toString()),
        product_id: product.id,
        name: product.name,
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
