"use client";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const path = usePathname();
  return (
    <>
      {path === "/" ? (
        <li>
          <Link href={"/login"} className={` ${sans.className}`}>
            Login
          </Link>
        </li>
      ) : null}
    </>
  );
}
