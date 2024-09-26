import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function FilterSeachByName({
  searchByName,
  catergory,
  limit,
  cursor,
}: {
  searchByName?: string;
  catergory?: Category;
  limit: number;
  cursor?: number;
}) {
  let products = [];
  let filteredProducts = await prisma.product.findMany({
    where: {
      category: catergory,
      name: { contains: searchByName, mode: "insensitive" },
    },
    orderBy: {
      id: "asc",
    },
  });

  const cursorIndex = cursor
    ? filteredProducts.findIndex((product) => product.id == cursor)
    : -1;

  if (cursorIndex === -1) {
    products = filteredProducts.slice(0, limit);
  } else {
    products = filteredProducts.slice(cursorIndex, cursorIndex + limit);
  }
  return products.map((product) => {
    return {
      ...product,
      price: product.price.toFixed(),
    };
  });
}
