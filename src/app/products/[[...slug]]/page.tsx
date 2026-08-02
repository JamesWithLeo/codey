import ProductPagination from "../../components/client/ProductPagination";
import { Category } from "@/src/generated/prisma/enums";
import { notFound } from "next/navigation";
import { prisma } from "@/src/prisma";
import ProductView from "../../components/Product/ProductView";
import ProductList from "../../components/client/productList";
import { BrowseProduct } from "@/lib/BrowseProduct";
import { getRedisProduct } from "@/lib/redis/getRedisProduct";

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

    // skips to product view if category is valid and no product id given.
    if (isProductDetailView) {
      const productId = parseInt(lastSegment, 10);

      if (isNaN(productId)) notFound();

      let product = await getRedisProduct(productId);

      if (!product) {
        const dbProduct = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!dbProduct) notFound();

        product = dbProduct;
      }

      return (
        <ProductView
          slug={slug}
          product={{
            ...product,
            price: Number(product.price).toFixed(2),
          }}
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

  const rawPage = parseInt(query.page);
  const page = Number.isNaN(rawPage) ? 1 : rawPage;

  const currentLimit = parseInt(query.limit);
  const limit = Number.isNaN(currentLimit) ? LIMIT : currentLimit;

  const { products, pagination } = await BrowseProduct({
    query: query.query,
    category: matchingCategoryEnum,
    page: page,
    limit,
  });

  return (
    <div className="w-full bg-base-300 py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="w-full h-min py-4 min-h-screen max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        <ProductList data={products} />
      </div>
      {products.length ? (
        <ProductPagination
          isEnd={pagination.isEnd}
          page={pagination.currentPage}
          firstCursor={pagination.currentCursor}
          defaultLimit={limit}
          nextCursor={pagination.nextCursor}
        />
      ) : null}
    </div>
  );
}
