import Stat from "../client/productStat";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function ProductStat() {
  const products = prisma.product.findMany();
  return (
    <>
      <Stat data={products} />
    </>
  );
}
