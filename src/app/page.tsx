import React from "react";
import ProductList from "./components/client/productList";
import Pagination from "./components/client/pagination";
import FilterSeachByName from "./components/client/utils/filterSeachProduct";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const LIMIT = 10;
  const query = searchParams.query;

  const currentCursor = parseInt(searchParams.cursor);
  const nextCursor = Number.isNaN(currentCursor) ? 1 : currentCursor;

  const products = await FilterSeachByName({
    searchByName: query,
    cursor: nextCursor,
    limit: LIMIT,
  });

  const lastCursor = products[9]?.id + 1;
  const productLength = products.length;

  return (
    <main className="w-full py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <>
          <ProductList data={products} />
        </>
      </div>
      {productLength ? (
        <Pagination
          isEnd={productLength !== LIMIT}
          nextCursor={lastCursor}
          limit={LIMIT}
        />
      ) : null}
    </main>
  );
}
