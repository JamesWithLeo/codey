import { ReactNode } from "react";

import AdminShell from "@/src/app/components/client/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
