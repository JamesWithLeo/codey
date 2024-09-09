import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full">{children}</main>;
}
