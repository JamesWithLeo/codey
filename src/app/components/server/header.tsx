"use client";

import { DM_Serif_Display } from "next/font/google";
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});
import Link from "next/link";

import LogoutButton from "../client/button/logoutButton";
import CategoryNav from "../client/categoryNav";
import Search from "../client/search";
import { auth } from "../../../authOptions";
import type { Session } from "next-auth";

import AdminButton from "../client/button/adminButton";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function Header({ session }: { session: Session | null }) {
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
      className={`w-full  sticky top-16 bg-white z-10 max-h-32 justify-center flex flex-col `}
    >
      {/* <section className="flex justify-center w-full flex-col items-center px-4 md:px-8 h-16">
        <div className="max-w-7xl grid grid-cols-3 w-full justify-between items-center">
          <Link
            className={`text-2xl sm:text-3xl ${dmSerif.className} text-gray-600`}
            href={"/"}
          >
            Hardware
          </Link>
          <div className="  place-self-center">
            <Search />
          </div>
          <div className="dropdown sm:block place-self-end dropdown-end w-max h-max">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={" px-4 "}
                render={<Button size={"lg"} className={"rounded-3xl "} />}
              >
                <Menu size={32} strokeWidth={3} />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>

                  {!session || !session.user ? (
                    <>
                      <DropdownMenuItem>
                        <Link href={"/login"} scroll={false} className="w-full">
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={"/signup"}
                          scroll={false}
                          className="w-full"
                        >
                          Sign up
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href={"/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={"/cart"}>Cart</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <LogoutButton />
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section> */}

      <CategoryNav activeCategory={activeCategory} />
    </header>
  );
}
