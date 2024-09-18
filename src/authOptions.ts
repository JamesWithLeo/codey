import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user?: User;
  }
  interface User {
    fistName: string;
    lastName: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
    role: "admin" | "user";
    id: number;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: "admin" | "user";
    id: number;
  }
}
const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
    async jwt({ token, trigger, account, profile, user }) {
      switch (trigger) {
        case "signIn":
          if (account && account.provider === "google" && profile) {
            const existingUser = await prisma.users.findUnique({
              where: { email: profile.email! },
            });
            if (!existingUser) {
              const newUser = await prisma.users.create({
                data: {
                  email: profile.email!,
                  username: profile.name ?? "",
                },
              });
              token.id = newUser.id;
              token.role = newUser.role;
            } else {
              token.id = existingUser.id;
              token.role = existingUser.role;
            }
          }

          break;
        case "signUp":
          console.log("signUp");
          break;
        case "update":
          console.log("update");
          break;
      }
      return token;
    },
    async session({ session, token, user, trigger }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
};

export default authOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
