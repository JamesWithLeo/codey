import { Suspense } from "react";
import SkeletonCard from "../components/server/skeletonCard";
import ProductList from "../components/client/productList";
import FilterSeachByName from "../components/client/filterSeachProduct";

export default async function Machineries({
  searchParams: params,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = params.query;
  const products = FilterSeachByName(query, "machineries");

  return (
    <main className="min-h-dvh my-2 px-8 items-center flex flex-col">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl">
        <Suspense fallback={<SkeletonCard />}>
          <>
            <ProductList promise={products} />
          </>
        </Suspense>
      </div>
    </main>
  );
}
