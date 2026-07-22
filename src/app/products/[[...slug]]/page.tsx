import ProductList from "../../components/client/productList";
import ProductPagination from "../../components/client/ProductPagination";
import FilterSeachByName from "../../components/client/utils/filterSeachProduct";
import { Category } from "@/src/generated/prisma/enums";
import { notFound } from "next/navigation";
import { prisma } from "@/src/prisma";
import ProductView from "../../components/Product/ProductView";

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

      // 1. Safe parsing guard (highly recommended)
      if (isNaN(productId)) {
        notFound();
      }

      // 2. Query strictly by the unique primary key (id)
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      // 3. Fallback: Verify record exists AND its category matches the URL route state
      if (!product || product.category !== matchingCategoryEnum) {
        notFound();
      }

      return (
        <ProductView
          slug={slug}
          product={{ ...product, price: product.price.toFixed(2) }}
        />
      );
    }
  }

  // ==========================================
  // VIEW B & C: PRODUCTS LIST (ALL OR FILTERED)
  // ==========================================
  if (matchingCategoryEnum === undefined && categorySegment) {
    notFound();
  }

  const currentCursor = parseInt(query.cursor);
  const rawCursor = Number.isNaN(currentCursor) ? undefined : currentCursor;

  const rawPage = parseInt(query.page);
  const page = Number.isNaN(rawPage) ? 1 : rawPage; // 👈 Extract page parameter safely

  const currentLimit = parseInt(query.limit);
  const limit = Number.isNaN(currentLimit) ? LIMIT : currentLimit;

  const products = await FilterSeachByName({
    searchByName: query.query,
    category: matchingCategoryEnum,
    cursor: rawCursor,
    page: page, // 👈 Pass the trackable page number down
    limit: limit + 1,
    defaultLimit: LIMIT,
  });

  // The rest of your slicing rules and cursors stay exactly the same!
  const hasMore = products.length > limit;
  const visibleProducts = hasMore ? products.slice(0, limit) : products;
  const firstCursor = visibleProducts[0]?.id;
  const nextCursor = hasMore ? products[products.length - 1]?.id : undefined;
  const isEnd = !hasMore;
  return (
    <div className="w-full bg-base-300 py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="w-full h-min py-4 min-h-screen max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {/* FIX 1: Pass visibleProducts instead of raw products */}
        <ProductList data={visibleProducts} />
      </div>
      {/* FIX 2: Check visibleProducts length instead of raw products length */}
      {visibleProducts.length ? (
        <ProductPagination
          isEnd={isEnd}
          firstCursor={firstCursor}
          nextCursor={nextCursor}
        />
      ) : null}
    </div>
  );
}
