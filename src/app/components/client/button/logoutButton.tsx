"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setIsLoading(false);
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onRetry: () => {
          setIsLoading(true);
        },
        onError: (errorContext) => {
          console.log("Sign out failed, Error during sign out.");
          console.log(errorContext.error);
          setIsLoading(false);
        },
      },
    });
  };
  return (
    <>
      <DropdownMenuItem
        variant={"destructive"}
        onClick={handleLogout}
        aria-disabled={isloading}
        disabled={isloading}
      >
        {isloading ? <Spinner data-icon="inline-start" /> : <LogOutIcon />}
        Logout
      </DropdownMenuItem>
    </>
  );
}
