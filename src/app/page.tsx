import Image from "next/image";
import Link from "next/link";
import Card from "./components/client/card";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <main className="w-full my-2 h-dvh flex px-8 flex-col items-center justify-center">
      <div className="h-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          return <Card key={product.id} object={product} />;
        })}
      </div>
    </main>
  );
}
