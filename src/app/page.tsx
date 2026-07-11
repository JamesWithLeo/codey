import ProductList from "./components/client/productList";
import ProductPagination from "./components/client/ProductPagination";
import FilterSeachByName from "./components/client/utils/filterSeachProduct";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const LIMIT = 10;
  const query = await searchParams;

  const currentCursor = parseInt(query.cursor);
  const nextCursor = Number.isNaN(currentCursor) ? 1 : currentCursor;
  const direction =
    query.direction === "forward" || query.direction === "backward"
      ? query.direction
      : "forward";

  const products = await FilterSeachByName({
    searchByName: query.searchByName,
    // direction: direction,
    cursor: nextCursor,
    limit: LIMIT,
  });

  const lastCursor = products[9]?.id;
  const productLength = products.length;

  return (
    <div className="w-full bg-base-300  py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className=" w-full h-min py-4   max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2  md:gap-4 ">
        <>
          <ProductList data={products} />
        </>
      </div>
      {productLength ? (
        <ProductPagination
          isEnd={productLength !== LIMIT}
          nextCursor={lastCursor}
          limit={LIMIT}
        />
      ) : null}
    </div>
  );
}
