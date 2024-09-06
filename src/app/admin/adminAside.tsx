"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AdminAside() {
  const path = usePathname()
  console.log(path) 
  return (
    <main className="w-52 flex flex-col min-w-52 bg-primary h-full ">
      <div className="grid grid-rows-10 w-full h-full group">
        <h1>Admin</h1>
        <Link href={"/"} className="pl-8 row-start-3 items-center flex">Home</Link>
        <Link href={"/admin/dashboard"} className={[
          path !== "/admin/dashboard" ? "" : "bg-white hover:bg-gray-100","pl-8 items-center  flex row-start-4"
        ].join(" ")}>Dashboard</Link>
        <Link href={"/admin/settings"} className={[
          path !== "/admin/settings" ? "" : "bg-white hover:bg-gray-100","items-center flex pl-8 row-start-5"
        ].join(" ")}>Settings</Link>
        <button className="row-start-10 text-left pl-8 items-center">Sign Out</button>
      </div>
    </main>
  )
}