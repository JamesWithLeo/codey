import Link from "next/link";
import { DM_Sans } from "next/font/google";
const sans = DM_Sans({ style: "normal", subsets: [] });

export default function SignupButton() {
  return (
    <>
      <li>
        <Link href={"/signup"} className={` ${sans.className}`}>
          Sign up
        </Link>
      </li>
    </>
  );
}
