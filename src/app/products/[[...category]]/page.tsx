import ProductList from "../../components/client/productList";
import ProductPagination from "../../components/client/ProductPagination";
import FilterSeachByName from "../../components/client/utils/filterSeachProduct";
import { Category } from "@/src/generated/prisma/enums";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{ category: string[] }>;
}) {
  const LIMIT = 15;
  const query = await searchParams;

  const currentCursor = parseInt(query.cursor);
  const nextCursor = Number.isNaN(currentCursor) ? 1 : currentCursor;

  const currentLimit = parseInt(query.limit);
  const limit = Number.isNaN(currentLimit) ? LIMIT : currentLimit;

  const rawCategory = (await params).category;
  const category =
    Array.isArray(rawCategory) && rawCategory.length > 0
      ? rawCategory[0]
      : undefined;

  if (category && typeof category === "string" && category.trim() !== "") {
    const isValidEnum = Object.values(Category).some(
      (enumValue) => enumValue.toLowerCase() === category.toLowerCase(),
    ); // if does not match any enum value, trigger notFound
    if (!isValidEnum) notFound();
  }

  const newCategory = Object.values(Category).includes(category as Category)
    ? (category as Category)
    : undefined;

  const products = await FilterSeachByName({
    searchByName: query.searchByName,
    category: newCategory,
    cursor: nextCursor,
    limit: limit,
    defaultLimit: LIMIT,
  });

  const lastCursor = products[limit - 1]?.id;
  const productLength = products.length;

  return (
    <div className="w-full bg-base-300  py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className=" w-full h-min py-4 min-h-screen   max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2  md:gap-4 ">
        <>
          <ProductList data={products} />
        </>
      </div>
      {productLength ? (
        <ProductPagination
          isEnd={productLength !== limit}
          nextCursor={lastCursor}
          limit={limit}
        />
      ) : null}
    </div>
  );
}
