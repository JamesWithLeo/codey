import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;
  if (!session || !user) redirect("/login");

  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center">
      <h1>{user.name}</h1>
    </main>
  );
}
