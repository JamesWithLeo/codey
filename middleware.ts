export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/admin", "/admin/dashboard", "/admin/settings"],
};
