import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/company", "/swap"];
const authRoutes = ["/auth/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route requires protection
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get authentication state from cookies (Privy sets these)
  const hasPrivyToken =
    request.cookies.has("privy-token") ||
    request.cookies.has("privy-id-token") ||
    request.cookies.has("privy-refresh-token");

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !hasPrivyToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if already authenticated and trying to access auth pages
  if (isAuthRoute && hasPrivyToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Note: Company role checking requires blockchain call, so we'll handle that in the page component
  // Middleware can't make async blockchain calls efficiently

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
  ],
};
