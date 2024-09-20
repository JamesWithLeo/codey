import { DM_Serif_Display } from "next/font/google";
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});
import Link from "next/link";
import LoginButton from "../server/loginButton";

import Image from "next/image";
import LogoutButton from "./button/logoutButton";
import CategoryNav from "./categoryNav";
import Search from "./search";
import { auth } from "@/authOptions";
import AdminButton from "./button/adminButton";

export default async function Header() {
  const session = await auth();

  return (
    <header
      className={`w-full itsm sticky top-0 bg-white z-10 max-h-32 justify-center flex flex-col `}
    >
      <section className="flex justify-center w-full flex-col items-center px-4 md:px-8 h-16">
        <div className="max-w-7xl flex w-full justify-between items-center">
          <Link
            className={`text-2xl sm:text-3xl ${dmSerif.className} text-gray-600`}
            href={"/"}
          >
            Hardware
          </Link>
          <div className=" sm:block">
            <Search />
          </div>
          <div className="dropdown sm:block dropdown-end w-max h-max">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm h-10 rounded-full bg-white "
            >
              <svg
                color="#374151"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {!session ? (
                <svg
                  color="#374151"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <Image
                  className="rounded-full"
                  src={session.user?.image ?? ""}
                  alt=""
                  height={20}
                  width={20}
                />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content shadow-lg menu bg-base-100 rounded-box z-[1] w-52 p-2"
            >
              {session && session.user?.role === "admin" ? (
                <>
                  <AdminButton />
                </>
              ) : null}

              {!session || !session.user ? (
                <>
                  <LoginButton />
                </>
              ) : (
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>
              )}
              <li>
                <h1>Settings</h1>
              </li>
              {session && session.user ? (
                <>
                  <div className="divider m-0" />
                  <LogoutButton />
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </section>

      <CategoryNav />
    </header>
  );
}
