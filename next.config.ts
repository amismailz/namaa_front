import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    minimumCacheTTL: 3600, // Cache for 1 hour (3600 seconds) dynamic images cache
    remotePatterns: [
      { protocol: "https", hostname: "*" },
      { protocol: "http", hostname: "*" }
    ],
    qualities: [75, 100] // ✅ allow quality=100
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
