import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/src/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],

  //  id: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  //   email: string;
  //   emailVerified: boolean;
  //   name: string;
  //   image: string | null;
  //   role: Role;
  //   lastName: string | null;
  //   firstName: string | null;
  //   isOnline: boolean;

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        required: false,
        defaultValue: "user",
      },

      lastName: { type: "string" },
      firstName: { type: "string" },
      location: { type: "string" },
      phoneNumber: { type: "string" },

      // name: { type: "string", required: false },
      // isOnline: { type: "boolean", required: false, defaultValue: false },
      // image: {
      //   type: "string",
      //   required: false,
      //   defaultValue: null,
      // },
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
