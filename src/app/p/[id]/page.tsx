import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Recomended from "@/app/components/server/recomended";

const prisma = new PrismaClient();
export default async function Page({ params }: { params: any }) {
  const id = parseInt(params.id);
  let product;
  if (!isNaN(id)) {
    product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      redirect("/p/not-found");
    }
  } else {
    redirect("/p/not-found");
  }
  return (
    <main className="h-dvh md:px-8 flex flex-col items-center">
      <div className="breadcrumbs text-xs overflow-y-hidden self-start px-4 sm:px-0">
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

      <div className="grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-2 flex-col sm:flex-row w-full gap-4 h-full mt-4 sm:mt-8 md:mt-12">
        {product && product.imageUrl ? (
          <div className="flex items-center flex-col px-4">
            <Image
              src={product.imageUrl}
              alt={product?.name ?? ""}
              height={100}
              width={100}
              priority
              className="w-full lg:w-80 h-max sm:w-60 max-w-52 sm:max-w-80"
            />
          </div>
        ) : null}
        <div className="grid grid-rows-6 h-full row-span-2 flex-col">
          <div className="px-4 ">
            <h1 className="card-title">{product?.name}</h1>
            <h1 className="">{product?.brand}</h1>
            <h1>${product?.price}</h1>
          </div>
          <div className="flex gap-2 w-full px-4 py-2">
            <button className="btn w-1/2 sm:w-max border-none shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
              </svg>
              Add to cart
            </button>
            <button className="btn bg-primary w-1/2 border-none sm:w-max shadow">
              Buy
            </button>
          </div>

          <div className="bg-gray-100 sm:bg-transparent row-span-4 h-full px-4">
            <h1 className="text-gray-600">Description</h1>
            <h1>{product?.description}</h1>
          </div>
        </div>
      </div>
      <Recomended />
    </main>
  );
}
