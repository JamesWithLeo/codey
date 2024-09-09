import { DM_Serif_Display } from "next/font/google";
const dmSerif = DM_Serif_Display({ subsets: [], weight: "400" });
import Link from "next/link";
import LoginButton from "./components/client/loginButton";
import SignupButton from "./components/client/signupButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "./components/client/logoutButton";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await getServerSession();
  return (
    <header
      className={`w-full sticky top-0 bg-white z-10 h-16 border-b-2 px-2 sm:px-4 flex items-center justify-between`}
    >
      <Link
        className={`text-3xl ${dmSerif.className} text-gray-700`}
        href={"/"}
      >
        Hardware
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"outline"} className="rounded-full">
            {!session || !session.user || !session.user.image ? (
              <User className="h-5" />
            ) : (
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt=""
                className="rounded-full"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!session ? (
            <>
              <LoginButton />
              <SignupButton />
            </>
          ) : (
            <>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem>Setting</DropdownMenuItem>
          {session ? (
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          Click
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>

      {/* <div className="dropdown dropdown-end dropdown-hover ">
        <div
          tabIndex={0}
          role="button"
          className="shadow btn w-10 rounded-full flex-col text-gray-600"
        >
          {session?.user ? (
            <Image
              src={session.user.image ?? ""}
              className="rounded-full w-8"
              alt=""
              width={1000}
              height={1000}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="solid"
              stroke="currentColor"
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
          )}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {session ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <li>
              <LoginButton />
            </li>
          )}
        </ul>
      </div> */}
    </header>
  );
}
