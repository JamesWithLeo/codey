import { Category } from "@/src/generated/prisma/enums";
import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "@/src/prisma";

export default async function FilterSeachByName({
  searchByName,
  category,
  limit,
  cursor,
  defaultLimit = 15,
}: {
  searchByName?: string;
  category?: Category;
  limit: number;
  cursor?: number | string;
  defaultLimit?: number;
}) {
  const whereClause: Prisma.productWhereInput = {};

  // 1. Safe handling for Category
  if (category) {
    whereClause.category = category;
  }

  // 2. Safe handling for Name Search (Bypasses the strict undefined block crash)
  if (searchByName && searchByName.trim() !== "") {
    const words = searchByName.trim().split(/\s+/);

    // 2. Map those words into an array of Prisma 'contains' filters
    whereClause.AND = words.map((word) => ({
      name: {
        contains: word,
        mode: "insensitive",
      },
    }));
  }

  const parsedCursor =
    typeof cursor === "string" ? parseInt(cursor, 10) : cursor;

  const isFreshSearch = !!(searchByName && searchByName.trim() !== "");

  const hasValidCursor =
    parsedCursor !== undefined &&
    !isNaN(parsedCursor) &&
    parsedCursor > 1 &&
    !isFreshSearch;

  const filteredProducts = await prisma.product.findMany({
    where: whereClause,
    take: limit || defaultLimit,
    orderBy: {
      id: "asc",
    },
    ...(hasValidCursor
      ? {
          cursor: { id: parsedCursor },
          skip: 1,
        }
      : {}),
  });

  return filteredProducts.map((product) => {
    return {
      ...product,
      price: product.price ? Number(product.price).toFixed(2) : "0.00",
    };
  });
}
