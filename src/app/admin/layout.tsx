import { ReactNode } from "react";
import AdminAside from "../components/server/adminAside";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-dvh w-full border-t">
      <AdminAside />
      {children}
    </main>
  );
}
