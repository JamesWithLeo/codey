"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminButton() {
  const path = usePathname();
  return (
    <>
      {path?.startsWith("/admin") ? (
        <>
          <li className="">
            <h1 className="text-xs font-medium">Admin</h1>
            <Link href={"/admin/dashboard"} className="indent-2">
              Dashboard
            </Link>
            <Link href={"/admin/pos"} className="indent-2">
              Point of sales
            </Link>
          </li>
          <div className="divider my-0" />
        </>
      ) : (
        <li className="">
          <Link href={"/admin"} className="">
            Admin
          </Link>
        </li>
      )}
    </>
  );
}
