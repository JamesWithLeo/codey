"use client";

import { DM_Sans } from "next/font/google";
import Link from "next/link";
const sans = DM_Sans({ subsets: [] });
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className={`flex flex-col items-center h-dvh gap-4  justify-center`}>
      <section className="max-w-xs flex flex-col gap-2 w-full h-max px-2 sm:px-0">
        <h1
          className={`my-4 text-3xl ${sans.className} text-center text-primary `}
        >
          Login
        </h1>
        <input
          type="text"
          className={`${sans.className} text-sm mb-2 input input-bordered`}
          placeholder="Enter your email"
        />
        <input
          type="text"
          className={`${sans.className} text-sm mb-2 input input-bordered`}
          placeholder="Enter your password"
          id="lastnameInput"
        />
        <div className="form-control">
          <div className="flex justify-between items-center">
            <label
              className={`${sans.className} text-xs font-light cursor-pointer flex gap-2`}
              htmlFor="rememberMe"
            >
              Remember me
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs"
                id="rememberMe"
              />
            </label>
            <Link
              href={"/forgot"}
              className={`${sans.className} font-light text-xs`}
            >
              Forgot password
            </Link>
          </div>
        </div>
        <button className="btn bg-primary">Login</button>
        <button
          className="font-normal btn"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          continue with github
        </button>
        <button
          className="font-normal btn"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          continue with google
        </button>
        <Link
          href={"/signup"}
          className={`w-full font-light text-center ${sans.className} text-sm btn-ghost btn`}
        >
          Doesn&lsquo;t have account?
        </Link>
      </section>
    </div>
  );
}
