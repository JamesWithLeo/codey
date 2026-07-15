import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen border-t">{children}</div>;
}
