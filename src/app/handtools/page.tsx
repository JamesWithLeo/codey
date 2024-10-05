import React from "react";
import Pagination from "../components/client/pagination";
import ProductList from "../components/client/productList";
import FilterSeachByName from "../components/client/utils/filterSeachProduct";

export default async function HandTools({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams.query;
  const limit = 10;

  const currentCursor = parseInt(searchParams.cursor);
  const nextCursor = Number.isNaN(currentCursor) ? 1 : currentCursor;

  const products = await FilterSeachByName({
    searchByName: query,
    catergory: "handtools",
    cursor: nextCursor,
    limit: limit,
  });

  const productLength = products.length;
  const lastCursor = products[9]?.id + 1;

  return (
    <main className="w-full py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <ProductList data={products} />
      </div>

      <Pagination
        isEnd={productLength !== limit}
        nextCursor={lastCursor}
        limit={limit}
      />
    </main>
  );
}
