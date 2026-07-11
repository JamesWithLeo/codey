import { Ubuntu } from "next/font/google";
import Link from "next/link";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 border-t border-zinc-400/60 text-sm h-max">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-zinc-400/60">
        <div className="px-6 md:px-12 py-10 flex flex-col gap-4">
          <h2
            className={`text-xs font-semibold tracking-wider text-zinc-400 uppercase ${ubuntu.className}`}
          >
            ABOUT
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Tools
            </Link>
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Delivery
            </Link>
          </div>
        </div>

        <div className="px-6 md:px-12 py-10 flex flex-col gap-4">
          <h2
            className={`text-xs font-semibold tracking-wider text-zinc-400 uppercase ${ubuntu.className}`}
          >
            SERVICE
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Customer Support
            </Link>
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Returns & Exchanges
            </Link>
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              FAQs
            </Link>
          </div>
        </div>

        <div className="px-6 md:px-12 py-10 flex flex-col gap-4">
          <h2
            className={`text-xs font-semibold tracking-wider text-zinc-400 uppercase ${ubuntu.className}`}
          >
            LEGAL
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-zinc-500 font-light hover:text-amber-500 transition-colors duration-200 w-max"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-zinc-400/60" />

      <div className="flex w-full items-center justify-center py-6 bg-zinc-100">
        <span className="text-xs text-zinc-400 tracking-wide">
          Developed by{" "}
          <Link
            href="https://jameswithleo.github.io/Portfolio"
            className="text-zinc-400 font-medium hover:text-amber-500 hover:underline hover:underline-offset-4 transition-colors duration-200"
          >
            James Leo Ocampo
          </Link>
        </span>
      </div>
    </footer>
  );
}
