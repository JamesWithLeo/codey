import { Category } from "@/src/generated/prisma/enums";
import { prisma } from "@/src/prisma";
import { Prisma } from "@prisma/client";

export default async function FilterSeachByName({
  searchByName,
  category,
  limit,
  cursor,
}: {
  searchByName?: string;
  category?: Category;
  limit: number;
  cursor?: number | string;
}) {
  const whereClause: Prisma.productWhereInput = {};

  // 1. Safe handling for Category
  if (category) {
    whereClause.category = category;
  }

  // 2. Safe handling for Name Search (Bypasses the strict undefined block crash)
  if (searchByName && searchByName.trim() !== "") {
    whereClause.name = {
      contains: searchByName.trim(),
      mode: "insensitive", // 🎯 Only evaluated when text actually exists!
    };
  }

  const parsedCursor =
    typeof cursor === "string" ? parseInt(cursor, 10) : cursor;
  const hasValidCursor =
    parsedCursor !== undefined && !isNaN(parsedCursor) && parsedCursor > 0;

  // 3. Fire the query bounded safely by your limit boundary
  const filteredProducts = await prisma.product.findMany({
    where: whereClause,
    take: limit || 10,
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
