"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Menu,
  User2,
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
} from "lucide-react";
import LogoutButton from "../client/button/logoutButton";
import SearchInput from "../client/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DM_Serif_Display } from "next/font/google";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Search from "../client/search";
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});
export default function GlobalHeader() {
  const router = useRouter();
  const session = useSession();
  const { data } = session;

  return (
    <section className="flex sticky top-0 z-30 bg-white justify-center w-full flex-col items-center px-4 md:px-8 h-16">
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
          <DropdownMenu closeParentOnEsc>
            <DropdownMenuTrigger
              className={" px-4 "}
              render={<Button size={"lg"} className={"rounded-3xl "} />}
            >
              <Menu size={32} strokeWidth={3} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className={"w-max"}>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>

                {!data?.session || !data.user ? (
                  <>
                    <DropdownMenuItem>
                      <Link href={"/login"} scroll={false} className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/signup"} scroll={false} className="w-full">
                        Sign up
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        router.push("/products");
                      }}
                    >
                      <Home />
                      Home
                    </DropdownMenuItem>
                    {data.user.role === "admin" && (
                      <DropdownMenuItem
                        className={"cursor-pointer"}
                        onClick={() => {
                          router.push("/admin");
                        }}
                      >
                        <LayoutDashboard />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      <User2 />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        router.push("/cart");
                      }}
                    >
                      <ShoppingCart />
                      Cart
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        router.push("/orders");
                      }}
                    >
                      <ShoppingBag />
                      Orders
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
    </section>
  );
}
