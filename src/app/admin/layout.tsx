import { ReactNode } from "react";
import AdminAside from "@/src//app/components/client/adminAside";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session?.user.role !== "admin") redirect("/");
  return (
    <main className="flex min-h-screen w-full bg-muted">
      <div className="drawer lg:drawer-open w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center w-full">
          {children}
        </div>
        <div className="drawer-side min-w-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <AdminAside />
        </div>
      </div>
    </main>
  );
}
