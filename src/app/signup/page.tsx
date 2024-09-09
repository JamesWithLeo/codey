import { DM_Sans } from "next/font/google";
import Link from "next/link";
const sans = DM_Sans({ subsets: [] });

export default function SignupPage() {
  return (
    <div className="w-full h-dvh gap-2 flex flex-col items-center justify-center ">
      <h1 className={`my-4 text-3xl ${sans.className} text-primary`}>
        Sign in
      </h1>
      <section className="max-w-xs flex flex-col gap-2 w-full h-max px-2 sm:px-0">
        <input
          type="email"
          className={`grow ${sans.className} text-sm mb-2`}
          placeholder="Enter your email"
          id="emailInput"
        />

        <input
          type="password"
          className={`grow ${sans.className} text-sm mb-2`}
          placeholder="Enter your password"
          id="passInput"
        />

        <input
          type="password"
          className={`grow ${sans.className} text-sm mb-2`}
          placeholder="Confirm your password"
          id="confirmpassInput"
        />
        <button className="btn w-full bg-primary hover:bg-primary text-white">
          create account
        </button>
        <button>
          <Link
            href={"/login"}
            className={`${sans.className} w-full font-light`}
          >
            Already have account?
          </Link>
        </button>
      </section>
    </div>
  );
}
