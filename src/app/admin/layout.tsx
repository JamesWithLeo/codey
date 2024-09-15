import { ReactNode } from "react";
import AdminAside from "../components/server/adminAside";
import { auth, Role } from "@/authOptions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== Role.admin) redirect("/");
  return (
    <main className="flex h-dvh w-full border-t">
      <AdminAside />
      {children}
    </main>
  );
}
