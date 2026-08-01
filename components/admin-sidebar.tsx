"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BarChart3, LayoutGrid, Package } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
const links = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Store overview",
    icon: LayoutGrid,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    description: "Charts and exports",
    icon: BarChart3,
  },
  {
    href: "/admin/products",
    label: "Products",
    description: "CRUD & bulk import",
    icon: Package,
  },
];

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { links?: typeof links }) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const navItems = useMemo(() => links ?? [], [links]);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="/">
                <span className="text-base font-semibold">Admin workspace</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-w-0 items-start gap-3  rounded-xl border px-3 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  active
                    ? "border-primary/20 bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <div className="mt-0.5 shrink-0 rounded-md text-primary  bg-background/80 p-2 shadow-sm">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="wrap-break-word text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="mt-auto rounded-2xl my-4 border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
          Keep inventory, revenue, and catalog workflows moving from a single
          control center.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
