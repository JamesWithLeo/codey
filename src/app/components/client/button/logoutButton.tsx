"use client";
import { getSession, signOut } from "next-auth/react";
export async function HandleLogout() {}
export default function LogoutButton() {
  return (
    <>
      <li>
        <button
          className="btn btn-error btn-sm text-gray-800"
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
          Logout
        </button>
      </li>
    </>
  );
}
