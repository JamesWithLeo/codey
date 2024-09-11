import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();
export default async function Page({ params }: { params: any }) {
  const id = params.id;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  return (
    <main className="my-2 h-dvh px-4 md:px-8 flex flex-col">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {product && product.category ? (
            <li>
              <Link href={`/${product.category}`}>{product?.category}</Link>
            </li>
          ) : null}
          <li>{product?.name}</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-evenly">
        {product && product.imageUrl ? (
          <div className="md:w-1/2 flex items-center justify-center">
            <Image
              src={product.imageUrl}
              alt={product?.name ?? ""}
              height={100}
              width={100}
              priority
              className="xl:w-96 w-full lg:w-80 sm:w-52 h-full"
            />
          </div>
        ) : null}
        <div className=" w-1/2">
          <h1>{product?.name}</h1>
          <h1>{product?.brand}</h1>
          <h1>{product?.description}</h1>
          <h1>{product?.price}</h1>
          <h1>{product?.stock}</h1>
          <button className="btn">Add to cart</button>
          <button className="btn bg-primary">Buy</button>
        </div>
      </div>
    </main>
  );
}
