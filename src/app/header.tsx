import { DM_Serif_Display } from "next/font/google";
const dmSerif = DM_Serif_Display({ subsets: [], weight: "400" });
import Link from "next/link";
import LoginButton from "./components/client/loginButton";
import SignupButton from "./components/client/signupButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "./components/client/logoutButton";
import CategoryNav from "./components/client/categoryNav";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header
      className={`w-full sticky top-0 bg-white z-10 max-h-32 justify-center flex flex-col`}
    >
      <section className="flex justify-between w-full items-center px-8 h-16">
        <Link
          className={`text-3xl ${dmSerif.className} text-gray-700`}
          href={"/"}
        >
          Hardware
        </Link>

        <label className="input-sm flex rounded-full input input-bordered items-center px-1">
          <input className="input-sm" placeholder="Search" id="searchInput" />
          <button className="p-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#9ca3af"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </button>
        </label>

        <div className="dropdown dropdown-end w-max h-max">
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
              className="size-6"
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
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link href={"/admin"}>Admin</Link>
            </li>
            {!session ? (
              <>
                <LoginButton />
                <SignupButton />
              </>
            ) : (
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
            )}
            <li>
              <h1>Settings</h1>
            </li>
            <div className="divider m-0" />
            <LogoutButton />
          </ul>
        </div>
      </section>
      <CategoryNav />
    </header>
  );
}
