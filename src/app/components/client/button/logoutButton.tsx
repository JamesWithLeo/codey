"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { getSession, signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <>
      <DropdownMenuItem
        variant={"destructive"}
        onClick={async () => {
          const session = await getSession();
          const resposne = await fetch("/api/signout", {
            method: "POST",
            body: JSON.stringify({ id: session?.user?.id }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const signOutResponse = await resposne.json();
          if (signOutResponse.ok === 1) signOut({ callbackUrl: "/" });
          else {
            console.log("Sign out failed, Error during sign out.");
          }
        }}
      >
        <LogOutIcon />
        Logout
      </DropdownMenuItem>
    </>
  );
}
