import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          "/social-media-agency-expert-social-marketing-agency-management-agency",
        destination: "/",
        permanent: true, // 301
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // You should also consider setting other critical security headers:
          // {
          //   key: 'Content-Security-Policy',
          //   value: "default-src 'self'", // Add your specific CSP rules
          // },
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
        ],
      },
    ]
  },
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
