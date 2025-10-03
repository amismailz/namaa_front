const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export const revalidate = 43200 // revalidate at most every 1 day

export async function GET() {
  const sitemaps = [
    `<sitemap><loc>${BASE_URL}/page-sitemap.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`,
    `<sitemap><loc>${BASE_URL}/services-sitemap.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`,
    `<sitemap><loc>${BASE_URL}/post-sitemap.xml</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
  ].join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
  </sitemapindex>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  })
}
