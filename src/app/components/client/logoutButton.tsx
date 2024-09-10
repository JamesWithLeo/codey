"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <>
      <li>
        <button
          className="btn btn-error btn-sm text-gray-800"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Logout
        </button>
      </li>
    </>
  );
}
