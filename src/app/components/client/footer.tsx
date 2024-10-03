import { Ubuntu } from "next/font/google";
import Link from "next/link";
const ubuntu = Ubuntu({ subsets: [], weight: ["300", "400", "500", "700"] });
export default function Footer() {
  return (
    <footer className="bg-gray-600 w-full px-4 md:px-8 flex-col flex py-4 h-max">
      <div
        className={`w-1/2 flex flex-col justify-between gap-4 ${ubuntu.className}`}
      >
        <div className="flex flex-col gap-1">
          <h1 className={`text-xl text-gray-300 ${ubuntu.className}`}>ABOUT</h1>
          <h1 className="text-gray-400 font-extralight">Tools</h1>
          <h1 className="text-gray-400 font-extralight">Delivery</h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className={`text-xl text-gray-300 ${ubuntu.className}`}>
            SERVICE
          </h1>
          <h1 className="text-gray-400 font-extralight">Customer Support</h1>
          <h1 className="text-gray-400 font-extralight">Returns & Exchanges</h1>
          <h1 className="text-gray-400 font-extralight">Faqs</h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className={`text-xl text-gray-300 ${ubuntu.className}`}>
            SERVICE
          </h1>
          <h1 className="text-gray-400 font-extralight">Privacy Policy</h1>
          <h1 className="text-gray-400 font-extralight">Terms & Conditions</h1>
          <h1 className="text-gray-400 font-extralight">Disclaimer</h1>
        </div>
      </div>
      <div className="w-full h-px bg-gray-500 my-8" />
      <div className="flex w-full items-center flex-col">
        <span className="text-xs text-gray-500 text-center">
          Developed by{" "}
          <Link
            href={"https://jameswithleo.github.io/Portfolio"}
            className="hover:underline-offset-2 hover:underline"
          >
            James Leo Ocampo
          </Link>
        </span>
      </div>
    </footer>
  );
}
