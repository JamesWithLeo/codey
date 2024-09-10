import { redirect } from "next/navigation";
import LogoutButton from "../components/client/logoutButton";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user;
  console.log(session);
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center">
      {user ? <h1>{user?.name}</h1> : null}
    </main>
  );
}
