import React from "react";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });

import Link from "next/link";

export default function LoginButton() {
  return (
    <>
      <li>
        <Link href={"/login"} className={` ${sans.className}`}>
          Login or sign up
        </Link>
      </li>
    </>
  );
}
