import { Suspense } from "react";
import SkeletonCard from "../components/server/skeletonCard";
import ProductList from "../components/client/productList";
import FilterSeachByName from "../components/client/utils/filterSeachProduct";

export default async function Electrical({
  searchParams: params,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = params.query;
  const products = await FilterSeachByName(query, "electrical");
  const serializedProduct = products.map((product) => {
    return {
      ...product,
      price: product.price.toFixed(2),
    };
  });
  return (
    <main className="w-full py-2 h-max flex px-4 md:px-8 flex-col gap-2 items-center justify-center">
      <div className="h-full w-full flex-col  max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 min-h-dvh">
        <>
          <ProductList data={serializedProduct} />
        </>
      </div>
    </main>
  );
}
