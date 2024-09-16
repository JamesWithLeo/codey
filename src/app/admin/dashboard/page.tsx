const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
import AddUser from "../../components/client/addUser";

export default async function Dashboard() {
  const users = await prisma.users.findMany();

  return (
    <main className="w-full h-full p-4">
      <div className="flex flex-col w-max gap-2">
        <AddUser />
      </div>
      {users.map((value) => (
        <div className="bg-gray-100 px-2 py-1" key={value.id}>
          <h1>{value.email}</h1>
        </div>
      ))}
    </main>
  );
}
