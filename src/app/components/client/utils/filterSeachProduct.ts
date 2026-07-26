import { Category } from "@/src/generated/prisma/enums";
import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "@/src/prisma";

export default async function FilterSeachByName({
  searchByName,
  category,
  limit,
  page = 1,
  cursor,
}: {
  searchByName?: string;
  category?: Category;
  limit: number;
  page?: number;
  cursor?: number;
}) {
  const whereClause: Prisma.productWhereInput = {};

  if (category) {
    whereClause.category = category;
  }

  // Filter by Search Query
  const isSearching = !!(searchByName && searchByName.trim() !== "");
  if (isSearching) {
    const words = searchByName.trim().split(/\s+/);
    whereClause.AND = words.map((word) => ({
      name: {
        contains: word,
        mode: "insensitive",
      },
    }));
  }

  // Hybrid Strategy Selection
  let queryOptions: Prisma.productFindManyArgs = {
    where: whereClause,
    take: limit,
    orderBy: { createdAt: "desc" },
  };

  if (cursor) {
    queryOptions.cursor = { id: cursor };
    queryOptions.skip = 1; // Skip current cursor item
  } else if (page > 1) {
    queryOptions.skip = (page - 1) * limit;
  }

  const [rawProducts, totalItems] = await Promise.all([
    prisma.product.findMany(queryOptions),
    prisma.product.count({ where: whereClause }),
  ]);

  const currentProductsLenght = rawProducts.length;

  return {
    products: rawProducts.map((product) => ({
      ...product,
      price: product.price ? Number(product.price).toFixed(2) : "0.00",
    })),

    pagination: {
      totalItems,
      isEnd: currentProductsLenght < limit,
      currentPage: page,
      currentCursor: cursor,
      nextCursor: rawProducts.at(currentProductsLenght - 1)?.id ?? 0,
    },
  };
}
