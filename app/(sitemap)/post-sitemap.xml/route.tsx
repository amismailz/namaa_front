import { NextResponse } from "next/server"

export const revalidate = 43200 // revalidate at most every 1 day

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const BASE_API = process.env.API_URL!

type Items = {
  id: number
  title: { en: string; ar: string }
  slug: { en: string; ar: string }
  created_at: string
}

type Response = {
  status: "success" | "error"
  text: string
  msg_data: Items[]
}

export async function GET() {
  try {
    const response = await fetch(`${BASE_API}/site-map/blogs`, {
      headers: {
        "Content-Type": "application/json"
      },
      // Cache control: RSS doesn’t need to re-fetch every time
      next: { revalidate: 43200 } // refresh every 1 min
    })

    if (!response.ok) {
      console.error("Failed to fetch blogs:", response.statusText)
      return new NextResponse(
        "<?xml version='1.0' encoding='UTF-8'?><urlset></urlset>",
        { headers: { "Content-Type": "application/xml" } }
      )
    }

    const result = (await response.json()) as Response
    const posts = result.msg_data as Items[]

    if (!posts.length) {
      return new NextResponse(
        "<?xml version='1.0' encoding='UTF-8'?><urlset></urlset>",
        { headers: { "Content-Type": "application/xml" } }
      )
    }

    const urls = posts.map(
      (item) =>
        `<url>
        <loc>${BASE_URL}/${item.slug.ar}/</loc>
        <lastmod>${new Date(item.created_at).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        </url>
        <url>
        <loc>${BASE_URL}/en/${item.slug.en}/</loc>
        <lastmod>${new Date(item.created_at).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
        </url>
        `
    )

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
