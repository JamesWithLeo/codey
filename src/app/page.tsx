import { PrismaClient } from "@prisma/client";
import ProductList from "./components/client/productList";
import Pagination from "./components/client/pagination";
const prisma = new PrismaClient();

async function getProduct({
  limit,
  cursor = 1,
}: {
  limit: number;
  cursor: number;
}) {
  const products = await prisma.product.findMany({
    cursor: { id: cursor },
    take: limit,
    orderBy: {
      id: "asc",
    },
  });
  return products;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let cursor: number;
  const currentCursor = parseInt(searchParams.cursor);
  if (!isNaN(currentCursor)) {
    cursor = currentCursor;
  } else {
    cursor = 1;
  }

  const limit = 10;
  const products = await getProduct({ limit: limit, cursor: cursor });
  const serializedProduct = products.map((product) => {
    return {
      ...product,
      price: product.price.toFixed(2),
    };
  });
  const lastCursor = products[9]?.id + 1;
  const productLength = products.length;

  return (
    <main className="w-full py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <>
          <ProductList data={serializedProduct} />
        </>
      </div>
      {productLength ? (
        <Pagination isEnd={productLength !== limit} nextCursor={lastCursor} />
      ) : null}
    </main>
  );
}
