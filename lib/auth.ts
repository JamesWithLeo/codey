import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/src/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : process.env.BETTER_AUTH_URL!,
  ],

  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.BETTER_AUTH_URL
      : "http://localhost:3000",

  user: {
    additionalFields: {
      role: { type: "string", input: false },
      firstName: { type: "string" },
      lastName: { type: "string" },
      isOnline: { type: "boolean" },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
});

export type AuthSession = typeof auth.$Infer.Session;
