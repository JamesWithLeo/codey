"use client";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ subsets: [] });
import { usePathname } from "next/navigation";

export default function AdminAside() {
  const path = usePathname();
  console.log(path);
  return (
    <main
      className={`w-52 flex flex-col h-dvh ${sans.className} border-r border-solid`}
    >
      <div className="grid grid-rows-10 w-full h-full group">
        <Link
          href={"/admin"}
          className={[
            path === "/admin"
              ? "text-primary border-primary"
              : "border-transparent",
            "pl-8 items-center hover:bg-gray-100 border-l-4 flex row-start-3",
          ].join(" ")}
        >
          Dashboard
        </Link>

        <Link
          href={"/admin/settings"}
          className={[
            path === "/admin/settings"
              ? "text-primary border-primary"
              : "border-transparent",
            "items-center hover:bg-gray-100 flex border-l-4  pl-8 row-start-4",
          ].join(" ")}
        >
          Settings
        </Link>
      </div>
    </main>
  );
}
