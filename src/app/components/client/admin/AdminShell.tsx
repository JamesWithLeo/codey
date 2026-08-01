import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <AdminHeader />
        <div className="min-h-[calc(100vh-4rem)] w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
