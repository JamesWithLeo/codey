import { ReactNode } from "react";
import AdminAside from "./adminAside";


export default function AdminLayout({children}:{children:ReactNode}) {
  return (
    <main className="flex h-dvh w-full">
      <AdminAside />
      {children}
    </main>
  )
}