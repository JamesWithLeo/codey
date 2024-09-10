import GithubProvider from "next-auth/providers/github";
const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
};

export default authOptions;
