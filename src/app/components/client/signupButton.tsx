"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });

export default function SignupButton() {
  const path = usePathname();
  return (
    <>
      {path === "/" ? (
        <li>
          <Link href={"/signup"} className={` ${sans.className}`}>
            Sign up
          </Link>
        </li>
      ) : null}
    </>
  );
}
