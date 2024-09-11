import { getServerSession } from "next-auth";
import AddProduct from "../components/client/addProduct";

export default async function AdminPage() {
  return (
    <main className="flex h-dvh w-full p-2">
      <AddProduct />
    </main>
  );
}
