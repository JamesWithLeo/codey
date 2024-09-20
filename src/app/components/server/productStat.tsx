import Stat from "../client/stat/productStat";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ProductStat() {
  const products = await prisma.product.findMany();
  const serializeProduct = products.map((value) => {
    return {
      ...value,
      price: value.price.toString(),
    };
  });
  return (
    <>
      <Stat data={serializeProduct} />
    </>
  );
}
