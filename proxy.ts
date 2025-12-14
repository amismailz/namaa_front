import { routing } from "@/i18n/routing";
import { DEFAULT_LOCALE } from "@/constants";
import { getDeviceType } from "@/lib/deviceDetection";
import createMiddleware from "next-intl/middleware";
import {NextResponse, type NextRequest } from 'next/server'

// next-intl middleware
const intlMiddleware = createMiddleware({
  ...routing,
  defaultLocale: DEFAULT_LOCALE
});

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Ignore auth routes, next assets, favicon, etc.
  const isAuthAPI = pathname.match(/^\/(ar|en)?\/?api\/auth/);
  if (
    isAuthAPI ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next(); // allow through
  }

  // Detect device type
  const userAgent = req.headers.get("user-agent");
  const device = getDeviceType(userAgent);

  // Run next-intl
  const response = intlMiddleware(req);

  // Attach device cookie
  response.cookies.set("x-device-type", device, { path: "/" });

  return response;
}

// Keep the same matchers
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
    "/((?!api/auth|_next|.*\\..*|favicon.ico).*)"
  ]
};