"use client";

import { DM_Sans } from "next/font/google";
import Link from "next/link";
const sans = DM_Sans({ subsets: [] });
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sailboat } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
export default function LoginPage() {
  return (
    <div className={`flex flex-col items-center h-dvh gap-4  justify-center`}>
      <h1 className={`my-4 text-3xl ${sans.className} text-primary `}>Login</h1>
      <section className="max-w-xs flex flex-col gap-2 w-full h-max px-2 sm:px-0">
        <Input
          type="text"
          className={`${sans.className} text-sm mb-2`}
          placeholder="Enter your email"
        />
        <Input
          type="text"
          className={`${sans.className} text-sm mb-2`}
          placeholder="Enter your password"
          id="lastnameInput"
        />
        <div className="form-control">
          <div className="flex justify-between items-center">
            <Label
              className={`${sans.className} text-xs font-light cursor-pointer flex gap-2`}
              htmlFor="rememberMe"
            >
              Remember me
              <Checkbox
                defaultChecked
                className="checkbox checkbox-xs"
                id="rememberMe"
              />
            </Label>
            <Link
              href={"/forgot"}
              className={`${sans.className} font-light text-xs`}
            >
              Forgot password
            </Link>
          </div>
        </div>
        <Button>Login</Button>
        <Button
          className="font-normal"
          variant={"outline"}
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          continue with github
        </Button>
        <Button
          className="font-normal"
          variant={"outline"}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          continue with google
        </Button>
        <Button variant={"ghost"} className="p-0">
          <Link
            href={"/signup"}
            className={`w-full font-light text-center ${sans.className} text-sm`}
          >
            Doesn&lsquo;t have account?
          </Link>
        </Button>
      </section>
    </div>
  );
}
