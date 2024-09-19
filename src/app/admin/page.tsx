import ProductStat from "../components/server/productStat";

export default async function AdminPage() {
  return (
    <main className="flex h-full w-full p-2 gap-2 drawer-content">
      <ProductStat />
    </main>
  );
}
