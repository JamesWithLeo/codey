import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const user = await prisma.users.findUnique({ where: { id: id } });
  if (!user) return redirect("/");

  return (
    <main className="h-dvh w-full ">
      <h1>Profile</h1>
      <h1>
        {user?.firstname} {user?.lastname}
      </h1>
    </main>
  );
}
