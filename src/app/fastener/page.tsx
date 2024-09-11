import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Card from "../components/client/card";

export default async function Page() {
  const products = await prisma.product.findMany({
    where: { category: "Fasteners" },
  });

  return (
    <main className="w-full my-2 h-dvh flex px-8 flex-col items-center justify-center">
      {" "}
      <div className="h-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          return <Card key={product.id} object={product} />;
        })}
      </div>
    </main>
  );
}
