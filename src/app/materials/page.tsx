import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Card from "../components/client/card";

export default async function Page() {
  const products = await prisma.product.findMany({
    where: { category: "Construction Materials" },
  });

  return (
    <main className="min-h-dvh my-2 px-8 items-center flex flex-col">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl">
        {products.map((product) => {
          return <Card key={product.id} object={product} />;
        })}
      </div>
    </main>
  );
}
