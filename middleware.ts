import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"
import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_LOCALE } from "@/constants"
import { getDeviceType } from "@/lib/deviceDetection"

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  ...routing,
  defaultLocale: DEFAULT_LOCALE
})

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Ignore auth routes, _next, favicon, etc.
  const isAuthAPI = pathname.match(/^\/(ar|en)?\/?api\/auth/)
  if (
    isAuthAPI ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  const userAgent = req.headers.get("user-agent")
  const device = getDeviceType(userAgent)

  const response = intlMiddleware(req)
  // response.headers.set("Accept-Language", locale) // Force Arabic
  // Set cookie for client use (optional: set maxAge if needed)
  response.cookies.set("x-device-type", device, { path: "/" })

  return response
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(ar|en)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
    // Avoid matching /api/auth and static files
    "/((?!api/auth|_next|.*\\..*|favicon.ico).*)"
  ]
}
