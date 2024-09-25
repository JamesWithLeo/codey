import { Category, PrismaClient } from "@prisma/client";
import ProductList from "../components/client/productList";
const prisma = new PrismaClient();

export default async function Page({
  searchParams: params,
}: {
  searchParams: { [key: string]: string };
}) {
  let products;
  let serializedProduct;
  const category = params.category as Category;
  console.log(`Searching:${params}\ncategory: ${category}`);

  if (category) {
    products = await prisma.product.findMany({
      where: {
        name: { contains: params.query, mode: "insensitive" },
        category: category,
      },
    });
    serializedProduct = products.map((product) => {
      return {
        ...product,
        price: product.price.toFixed(2),
      };
    });
  } else {
    products = await prisma.product.findMany({
      where: {
        name: { contains: params.query, mode: "insensitive" },
      },
    });
    serializedProduct = products.map((product) => {
      return {
        ...product,
        price: product.price.toFixed(2),
      };
    });
  }

  return (
    <main className="w-full py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <>
          <ProductList data={serializedProduct} />
        </>
      </div>
    </main>
  );
}
