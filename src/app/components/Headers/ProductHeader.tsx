"use client";

import CategoryNav from "../client/categoryNav";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const pathSegments = pathname?.split("/").filter(Boolean);

  let activeCategory = "";
  if (Array.isArray(pathSegments) && pathSegments.length > 0) {
    const isProductPage = pathSegments[0] === "products";
    const categories = isProductPage ? pathSegments.slice(1) : [];
    activeCategory = categories[0] || "";
  }

  return (
    <header
      className={`w-full  sticky top-16 bg-white z-20 max-h-32 justify-center flex flex-col `}
    >
      <CategoryNav activeCategory={activeCategory} />
    </header>
  );
}
