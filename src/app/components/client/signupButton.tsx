"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
const sans = DM_Sans({ style: "normal", subsets: [] });

export default function SignupButton() {
  const path = usePathname();
  return (
    <>
      {path === "/" ? (
        <DropdownMenuItem>
          <Link href={"/signup"} className={` ${sans.className}`}>
            Sign up
          </Link>
        </DropdownMenuItem>
      ) : null}
    </>
  );
}
