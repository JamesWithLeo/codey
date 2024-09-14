import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
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
    async session({ session, token, user }) {
      return session;
    },
  },
};

export default authOptions;
