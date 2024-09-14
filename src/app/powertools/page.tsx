import { Suspense } from "react";
import SkeletonCard from "../components/server/skeletonCard";
import ProductList from "../components/client/productList";
import FilterSeachByName from "../components/client/filterSeachProduct";

export default function PowerTools({
  searchParams: params,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = params.query;
  const products = FilterSeachByName(query, "powertools");

  return (
    <main className="min-h-dvh my-2 px-8 items-center flex flex-col">
      <div className="h-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        <Suspense fallback={<SkeletonCard />}>
          <>
            <ProductList promise={products} />
          </>
        </Suspense>
      </div>
    </main>
  );
}
