import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.BETTER_AUTH_URL
      : "http://localhost:3000",

  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
