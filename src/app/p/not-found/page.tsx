import { Outfit } from "next/font/google";
import Link from "next/link";
const outfit = Outfit({ weight: ["200", "400"], subsets: ["latin"] });
export default function NotFound() {
  return (
    <main className="h-dvh md:px-8 flex flex-col items-center justify-center">
      <h1 className={`${outfit.className} text-xl sm:text-2xl text-primary`}>
        404 not found
      </h1>
      <h1
        className={`sm:text-sm text-xs text-center ${outfit.className} font-normal`}
      >
        <div className="divider my-0" />
        The product is either removed or
        <br />
        moved to another location.
      </h1>
      <Link href={"/"} className="my-2 hover:border-b-2 border-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#ff8225"
          viewBox="0 0 256 256"
        >
          <path
            d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z"
            opacity="0.2"
          ></path>
          <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
        </svg>
      </Link>
    </main>
  );
}
