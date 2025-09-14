import { ROUTES } from "@/constants"
import { BlogItemType } from "@/types.type"
import { getLocale } from "next-intl/server"
import { NextResponse } from "next/server"

const baseUrl = process.env.API_URL!
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL!

export async function GET() {
  try {
    const locale = await getLocale()
    const response = await fetch(`${baseUrl}/blogs`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale
      },
      // Cache control: RSS doesn’t need to re-fetch every time
      next: { revalidate: 60 } // refresh every 1 min
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`)
    }

    const result = await response.json()
    const posts: BlogItemType[] = result.msg_data

    // fallback: avoid empty feed crashing
    if (!posts.length) {
      return new NextResponse("<?xml version='1.0'?><rss></rss>", {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
      })
    }

    // sanitize text for XML
    const escapeCdata = (str: string) =>
      str?.replace(/]]>/g, "]]]]><![CDATA[>") ?? ""

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>Ensign Agency » Feed</title>
          <link>${siteUrl}</link>
          <description>Latest updates from Ensign Agency</description>
          <language>${locale === "en" ? "en-US" : "ar_EG"}</language>
          <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
          ${posts
            .map(
              (post) => `
            <item>
              <title><![CDATA[${escapeCdata(post.title)}]]></title>
              <link>${siteUrl}/${locale}/${post.slug}</link>
              <guid isPermaLink="true">${siteUrl}/${locale}/${post.slug}</guid>
              <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
              <description><![CDATA[${escapeCdata(
                post.short_description
              )}]]></description>
            </item>`
            )
            .join("")}
        </channel>
      </rss>`

    return new NextResponse(feed, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
      }
    })
  } catch (error) {
    console.error("RSS feed generation failed:", error)

    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    })
  }
}
