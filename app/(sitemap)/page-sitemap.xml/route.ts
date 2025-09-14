import { ROUTES } from "@/constants"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function GET() {
  const staticPages = [
    { path: ROUTES.HOME, rate: 1 },
    { path: ROUTES.ABOUT_US, rate: 0.9 },
    { path: ROUTES.CONTACT_US, rate: 0.8 },
    { path: ROUTES.BLOG, rate: 0.9 },
    { path: ROUTES.PACKAGES, rate: 0.9 },
    { path: ROUTES.JOB, rate: 0.7 },
    { path: ROUTES.SERVICES, rate: 0.9 },
    { path: ROUTES.ENSIGN_SERVICES, rate: 0.9 },
    { path: ROUTES.WEBSITE_DESIGN, rate: 0.9 },
    { path: ROUTES.GRAPHIC_DESIGN, rate: 0.9 },
    { path: ROUTES.LOGO_DESIGN, rate: 0.9 },
    { path: ROUTES.WEBSITE_DEVELOPMENT, rate: 0.9 },
    { path: ROUTES.WEB_MULTIMEDIA, rate: 0.9 },
    { path: ROUTES.WEB_HOSTING, rate: 0.9 },
    { path: ROUTES.E_COMMERCE, rate: 0.9 },
    { path: ROUTES.EMAIL_MARTKETING, rate: 0.9 },
    { path: ROUTES.SOCIAL_MEDIA, rate: 0.9 },

    { path: ROUTES.LEGAL, rate: 0.7 },
    { path: ROUTES.PRIVACY, rate: 0.7 },
    { path: ROUTES.TERMS , rate: 0.7}
  ]

  const urlsEN = staticPages
    .map(
      (page) =>
        `<url>
        <loc>${BASE_URL}/en/${page.path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page.rate}</priority>
        </url>`
    )
    

  const urlAR = staticPages
    .map(
      (page) =>
        `<url>
        <loc>${BASE_URL}/ar/${page.path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page.rate}</priority>
        </url>`
    )

  const urls = [...urlsEN, ...urlAR].join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  })
}
