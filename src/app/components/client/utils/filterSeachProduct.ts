import { Category } from "@/src/generated/prisma/enums";
import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "@/src/prisma";

export default async function FilterSeachByName({
  searchByName,
  category,
  limit,
  cursor,
  page = 1,
  defaultLimit = 15,
}: {
  searchByName?: string;
  category?: Category;
  limit: number;
  cursor?: number | string;
  page?: number;
  defaultLimit?: number;
}) {
  const whereClause: Prisma.productWhereInput = {};
  const currentLimit = limit || defaultLimit;

  // 1. Filter by Category
  if (category) {
    whereClause.category = category;
  }

  // 2. Filter by Search Query
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

  const parsedCursor =
    typeof cursor === "string" ? parseInt(cursor, 10) : cursor;
  const hasValidCursor = parsedCursor !== undefined && !isNaN(parsedCursor);

  // 3. Hybrid Strategy Selection
  let queryOptions: Prisma.productFindManyArgs = {
    where: whereClause,
    take: currentLimit,
    orderBy: { id: "asc" },
  };

  // If the user is searching text OR navigating pages beyond page 1,
  // offset pagination ensures that going backward is mathematically perfect.
  if (isSearching || page > 1) {
    queryOptions.skip = (page - 1) * currentLimit;
  } else if (hasValidCursor) {
    queryOptions.cursor = { id: parsedCursor };
    queryOptions.skip = 1;
  }

  const filteredProducts = await prisma.product.findMany(queryOptions);

  return filteredProducts.map((product) => ({
    ...product,
    price: product.price ? Number(product.price).toFixed(2) : "0.00",
  }));
}
