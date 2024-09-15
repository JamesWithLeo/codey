import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

export enum Role {
  user = "user",
  admin = "admin",
}

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
    role: Role;
    uid: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
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
  pages: {
    signIn: "/login",
    signOut: "/",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
    async jwt({ token, trigger, account, profile, user }) {
      switch (trigger) {
        case "signIn":
          if (account && account.provider === "google") {
          }
          break;
        case "signUp":
          break;
        case "update":
          break;
      }
      token.role = Role.user;
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.fistName = "james";
        return session;
      }
      return session;
    },
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
