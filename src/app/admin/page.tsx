import ProductStat from "@/src/app/components/server/productStat";
import UserStat from "@/src/app/components/server/userStat";

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductStat />
        {/* <UserStat /> */}
      </div>
    </div>
  );
}
