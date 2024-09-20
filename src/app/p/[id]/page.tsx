import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { Inter_Tight } from "next/font/google";
import Recomended from "@/app/components/server/recomended";
import ProductControls from "@/app/components/client/productControls";
const inter = Inter_Tight({ subsets: ["latin"], weight: ["300"] });

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

  const serializedProduct = { ...product, price: product.price.toFixed(2) };
  return (
    <main className="h-full md:px-8 grid gap-2 flex-col items-center pt-2 pb-8">
      <div className="breadcrumbs text-xs overflow-y-hidden self-start px-4 md:px-0">
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

      <div className="grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-2 flex-col sm:flex-row w-full gap-4 h-full ">
        {product && product.thumbnail ? (
          <div className="flex items-center flex-col px-4">
            <Image
              src={product.thumbnail}
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
            <h1>${parseFloat(product.price.toString()).toFixed(2)}</h1>
          </div>
          <ProductControls product={serializedProduct} />

          <div className="bg-gray-100 sm:bg-transparent row-span-4 h-full px-4">
            <h1 className="text-gray-600">Description</h1>
            <h1 className={`${inter.className} text-sm text-justify`}>
              {product?.description}
            </h1>
          </div>
        </div>
      </div>
      <Recomended
        category={product.category}
        selectedProductId={product.id}
        selectedProductName={product.name}
      />
    </main>
  );
}
