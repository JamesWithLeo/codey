import ProductStat from "../components/server/productStat";

export default async function AdminPage() {
  return (
    <main className="flex h-dvh w-full p-2 gap-2">
      <ProductStat />
    </main>
  );
}
