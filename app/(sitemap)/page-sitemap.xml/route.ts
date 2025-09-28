import { ROUTES } from "@/constants"

export const revalidate = 86400 // revalidate at most every 1 day

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function GET() {
  const staticPages = [
    { path_ar: "/", path_en: ROUTES.HOME, rate: 1 },
    { path_ar: "/معلومات-عنا", path_en: ROUTES.ABOUT_US, rate: 0.9 },
    { path_ar: "/اتصل-بنا", path_en: ROUTES.CONTACT_US, rate: 0.8 },
    {
      path_ar: "/أفضل-شركات-التسويق-الإلكترونى-عبر-الإنترنت",
      path_en: ROUTES.BLOG,
      rate: 0.9
    },
    { path_ar: "/اعملنا", path_en: ROUTES.PORTOFILIO, rate: 0.9 },
    { path_ar: "/تسعير-الباقات", path_en: ROUTES.PACKAGES, rate: 0.9 },
    { path_ar: "/توظيف-namaa-agency", path_en: ROUTES.JOB, rate: 0.7 },
    { path_ar: "/الاسئلة-الشائعة", path_en: ROUTES.FAQ, rate: 0.8 },
    { path_ar: "/خدمات", path_en: ROUTES.SERVICES, rate: 0.9 },
    { path_ar: "/إخلاء-المسؤولية-القانونية", path_en: ROUTES.LEGAL, rate: 0.7 },
    { path_ar: "/سياسة-خاصة", path_en: ROUTES.PRIVACY, rate: 0.7 },
    { path_ar: "/شروط", path_en: ROUTES.TERMS, rate: 0.7 }
  ]

  const urlsEN = staticPages
    .map(
      (page) =>
        `<url>
        <loc>${BASE_URL}/en/${page.path_en}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page.rate}</priority>
        </url>`
    )
    

  const urlAR = staticPages
    .map(
      (page) =>
        `<url>
        <loc>${BASE_URL}${page.path_ar}</loc>
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
