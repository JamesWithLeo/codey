import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  if (["/"].includes(pathname)) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (pathname.startsWith("/admin")) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (internal server backend routes)
     * - _next/static (compiled UI scripts and styles)
     * - _next/image (automatically optimized image assets)
     * - favicon.ico (the browser tab icon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
