import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full p-4 h-full">{children}</main>;
}
