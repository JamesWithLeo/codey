import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { User } from "@/src/generated/prisma/client";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;

export async function signInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/products",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/products",

    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: false,
  });

  return { data, error };
}

export async function signupWithEmail({
  email,
  password,
  callbackURL,
}: {
  email: string;
  password: string;

  callbackURL?: string | undefined;
}) {
  return await authClient.signUp.email(
    {
      email,
      password, // user password -> min 8 characters by default
      callbackURL, // A URL to redirect to after the user verifies their email (optional)
      name: "",
      // firstName,
      // lastName,
      // location,
      // phoneNumber,
    },
    {
      onRequest: (ctx) => {
        //show loading
        console.log("Requesting signup with email...");
      },
      onSuccess: (ctx) => {
        console.log("Signup successful!", ctx.data);
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    },
  );
}

export async function signInWithEmail({
  email,
  password,
  callbackURL,
  rememberMe,
}: {
  email: string;
  password: string;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
}) {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe,
  });
}
