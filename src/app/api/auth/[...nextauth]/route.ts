import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export const authOptions = {
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
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
