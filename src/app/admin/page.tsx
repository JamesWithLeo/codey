import Stat from "../components/client/stat/userStat";
import ProductStat from "../components/server/productStat";
import UserStat from "../components/server/userStat";

export default async function AdminPage() {
  return (
    <main className="flex h-full w-full p-2 flex-col md:flex-row gap-2 drawer-content">
      <ProductStat />
      <UserStat />
    </main>
  );
}
