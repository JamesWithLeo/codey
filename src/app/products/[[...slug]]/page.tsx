import ProductList from "../../components/client/productList";
import ProductPagination from "../../components/client/ProductPagination";
import FilterSeachByName from "../../components/client/utils/filterSeachProduct";
import { Category } from "@/src/generated/prisma/enums";
import { notFound } from "next/navigation";
import { prisma } from "@/src/prisma";
import Image from "next/image";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{ slug?: string[] }>;
}) {
  const LIMIT = 15;
  const query = await searchParams;
  const { slug: rawSlug } = await params;
  const slug = rawSlug || [];

  const categorySegment = Array.isArray(slug) ? slug[0] : undefined;
  const isValidCategory =
    categorySegment &&
    Object.values(Category).some(
      (enumValue) => enumValue.toLowerCase() === categorySegment.toLowerCase(),
    );

  let matchingCategoryEnum: Category | undefined = undefined;

  matchingCategoryEnum = Object.values(Category).find(
    (enumValue) =>
      enumValue.toLowerCase() === (categorySegment ?? "").toLowerCase(),
  ) as Category;

  // ==========================================
  // VIEW A: PRODUCT DETAIL MODE
  // ==========================================
  if (slug.length > 0) {
    const lastSegment = slug[slug.length - 1];
    const isProductDetailView = /^\d+$/.test(lastSegment);

    if (!isValidCategory && !isProductDetailView) {
      notFound();
    }
    if (isProductDetailView) {
      const productId = parseInt(lastSegment, 10);
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
          category: matchingCategoryEnum,
        },
      });

      if (!product) notFound();

      return (
        <div className="w-full max-w-7xl min-h-screen mx-auto p-6 bg-white   mt-6">
          <div className="grid grid-cols-2">
            <div className="flex items-center flex-col px-4">
              <Image
                src={product.thumbnail}
                alt={`${product.name} Thumbnail`}
                height={200}
                width={200}
                priority
                className="w-full lg:w-80 h-max sm:w-60 max-w-52 sm:max-w-80"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-amber-600 tracking-wider">
                {slug.slice(0, -1).join(" > ") || "Products"}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                ${product.price.toFixed(2)}
              </p>

              <div className="mt-6 text-sm leading-relaxed text-justify border-t pt-4 text-gray-600">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // ==========================================
  // VIEW B & C: PRODUCTS LIST (ALL OR FILTERED)
  // ==========================================

  // If there's a slug, validate and find the matching category enum

  if (matchingCategoryEnum === undefined && categorySegment) {
    notFound();
  }

  const currentCursor = parseInt(query.cursor);
  const nextCursor = Number.isNaN(currentCursor) ? 1 : currentCursor;

  const currentLimit = parseInt(query.limit);
  const limit = Number.isNaN(currentLimit) ? LIMIT : currentLimit;

  const products = await FilterSeachByName({
    searchByName: query.searchByName,
    category: matchingCategoryEnum,
    cursor: nextCursor,
    limit: limit,
    defaultLimit: LIMIT,
  });

  const lastCursor = products[limit - 1]?.id;
  const productLength = products.length;

  return (
    <div className="w-full bg-base-300 py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="w-full h-min py-4 min-h-screen max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        <ProductList data={products} />
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
