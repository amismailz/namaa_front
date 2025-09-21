import { ROUTES } from "@/constants"

export const revalidate = 172800 // revalidate at most  every 2 day

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function GET() {
  const staticPages = [
    { path_ar: "/الرئيسية", path_en: ROUTES.HOME, rate: 1 },
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
    { path_ar: "/خدمات-namaa", path_en: ROUTES.ENSIGN_SERVICES, rate: 0.9 },
    { path_ar: "/تصميم-الموقع", path_en: ROUTES.WEBSITE_DESIGN, rate: 0.9 },
    { path_ar: "/التصميم-الجرافيك", path_en: ROUTES.GRAPHIC_DESIGN, rate: 0.9 },
    { path_ar: "/تصميم-شعار", path_en: ROUTES.LOGO_DESIGN, rate: 0.9 },
    {
      path_ar: "/تطوير-الموقع",
      path_en: ROUTES.WEBSITE_DEVELOPMENT,
      rate: 0.9
    },
    {
      path_ar: "/ويب-الوسائط-المتعددة",
      path_en: ROUTES.WEB_MULTIMEDIA,
      rate: 0.9
    },
    { path_ar: "/استضافة-الموقع", path_en: ROUTES.WEB_HOSTING, rate: 0.9 },
    { path_ar: "/التجارة-الإلكترونية", path_en: ROUTES.E_COMMERCE, rate: 0.9 },
    {
      path_ar: "/التسويق-عبر-البريد-الإلكتروني",
      path_en: ROUTES.EMAIL_MARTKETING,
      rate: 0.9
    },
    {
      path_ar: "/وسائل-التواصل-الاجتماعي",
      path_en: ROUTES.SOCIAL_MEDIA,
      rate: 0.9
    },

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
