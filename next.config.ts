import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import { ROUTES } from "./constants"

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/en",
        destination: `/${ROUTES.HOME}`,
        permanent: true
      }
    ]
  },
  trailingSlash: true,
  images: {
    minimumCacheTTL: 3600, // Cache for 1 hour (3600 seconds) dynamic images cache
    remotePatterns: [
      { protocol: "https", hostname: "*" },
      { protocol: "http", hostname: "*" }
    ]
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
