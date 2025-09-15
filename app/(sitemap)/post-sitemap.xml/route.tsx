import { ROUTES } from "@/constants"
import { BlogItemType } from "@/types.type"
import { getLocale } from "next-intl/server"
import { NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const BASE_API = process.env.API_URL!

export async function GET() {
  try {
    const locale = await getLocale()
    const response = await fetch(`${BASE_API}/blogs`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale
      },
      // Cache control: RSS doesn’t need to re-fetch every time
      next: { revalidate: 60 } // refresh every 1 min
    })

    if (!response.ok) {
      console.error("Failed to fetch blogs:", response.statusText)
      return new NextResponse(
        "<?xml version='1.0' encoding='UTF-8'?><urlset></urlset>",
        { headers: { "Content-Type": "application/xml" } }
      )
    }

    const result = await response.json()
    const posts: BlogItemType[] = result.msg_data

    if (!posts.length) {
      return new NextResponse(
        "<?xml version='1.0' encoding='UTF-8'?><urlset></urlset>",
        { headers: { "Content-Type": "application/xml" } }
      )
    }

    const urlsEN = posts.map(
      (item) =>
        `<url>
        <loc>${BASE_URL}/en/${item.slug}</loc>
        <lastmod>${new Date(item.created_at).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        </url>`
    )

    const urlsAR = posts.map(
      (item) =>
        `<url>
        <loc>${BASE_URL}/${item.slug}</loc>
        <lastmod>${new Date(item.created_at).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        </url>`
    )

    const urls = [...urlsEN, ...urlsAR].join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${urls}
         </urlset>`

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" }
    })
  } catch (error) {
    console.error("Sitemap generation error:", error)
    return new NextResponse(
      "<?xml version='1.0' encoding='UTF-8'?><urlset></urlset>",
      { headers: { "Content-Type": "application/xml" } }
    )
  }
}
