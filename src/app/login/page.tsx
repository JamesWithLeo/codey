"use client";

import { DM_Sans } from "next/font/google";
import Link from "next/link";
const sans = DM_Sans({ subsets: [] });
import signInWithGoogle from "@/lib/sign-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function LoginPage() {
  const handleLogin = async () => {
    const { data, error } = await signInWithGoogle();
    console.log(data, error);
  };
  return (
    <div className={`flex flex-col items-center h-dvh gap-4  justify-center`}>
      <section className="max-w-sm flex flex-col gap-2 w-full h-max px-2 sm:px-0">
        <h1
          className={`my-4 text-2xl ${sans.className} font-bold text-center text-primary `}
        >
          Log in or sign up
        </h1>
        <Input
          type="text"
          className={`${sans.className} mb-2 h-12 text-lg input input-bordered`}
          placeholder="Enter your email"
        />
        <Input
          type="password"
          className={`${sans.className} text-lg h-12 mb-2 input input-bordered`}
          placeholder="Enter your password"
        />
        <div className="  items-center justify-between flex gap-2 ">
          <FieldGroup className=" text-xs text-nowrap w-min  ">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="terms-checkbox-basic">
                Remember me
              </FieldLabel>
              <Checkbox />
            </Field>
          </FieldGroup>
          <Link
            href={"#"}
            className={`${sans.className} w-min font-light text-xs`}
          >
            Forgot password
          </Link>
        </div>
        <div className="flex gap-3 flex-col">
          <Button className="" size={"lg"} variant={"default"}>
            continue
          </Button>

          <Separator />
          <Button
            className="font-normal btn"
            variant={"secondary"}
            size={"lg"}
            onClick={handleLogin}
          >
            continue with google
          </Button>
        </div>
      </section>
    </div>
  );
}
