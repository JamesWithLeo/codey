import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({ subsets: [], weight: ["300", "400", "500", "700"] });
export default function Footer() {
  return (
    <footer className="bg-gray-600 w-full px-4 md:px-8 flex py-4 h-max">
      <div className={`w-1/2 flex justify-between gap-2 ${ubuntu.className}`}>
        <div className="flex flex-col gap-1">
          <h1 className={`text-xl text-gray-300 ${ubuntu.className}`}>ABOUT</h1>
          <h1 className="text-gray-400 font-extralight">Tools</h1>
          <h1 className="text-gray-400 font-extralight">Delivery</h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className={`text-xl text-gray-300 ${ubuntu.className}`}>
            SERVICE
          </h1>
          <h1 className="text-gray-400 font-extralight">Customore Support</h1>
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
    </footer>
  );
}
