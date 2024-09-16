import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function FilterSeachByName(
  searchByName: string | undefined,
  catergory: Category,
) {
  let products;
  if (searchByName)
    products = await prisma.product.findMany({
      where: {
        category: catergory,
        name: { contains: searchByName, mode: "insensitive" },
      },
    });
  else
    products = await prisma.product.findMany({
      where: { category: catergory },
    });
  return products;
}
