import { ROUTES } from "@/constants"

const pages = [
  { key: `/${ROUTES.HOME}`, en: `/${ROUTES.HOME}`, ar: "/الرئيسية" },
  {
    key: `/${ROUTES.CONTACT_US}`,
    en: `/${ROUTES.CONTACT_US}`,
    ar: "/اتصل-بنا"
  },
  { key: `/${ROUTES.ABOUT_US}`, en: `/${ROUTES.ABOUT_US}`, ar: "/معلومات-عنا" },
  { key: `/${ROUTES.PORTOFILIO}`, en: `/${ROUTES.PORTOFILIO}`, ar: "/اعملنا" },
  {
    key: `/${ROUTES.BLOG}`,
    en: `/${ROUTES.BLOG}`,
    ar: "/أفضل-شركات-التسويق-الإلكترونى-عبر-الإنترنت"
  },
  {
    key: `/${ROUTES.PACKAGES}`,
    en: `/${ROUTES.PACKAGES}`,
    ar: "/تسعير-الباقات"
  },
  {
    key: `/${ROUTES.FAQ}`,
    en: `/${ROUTES.FAQ}`,
    ar: "/الاسئلة-الشائعة"
  },
  { key: `/${ROUTES.JOB}`, en: `/${ROUTES.JOB}`, ar: "/توظيف-namaa" },
  { key: `/${ROUTES.SERVICES}`, en: `/${ROUTES.SERVICES}`, ar: "/خدمات" },
  {
    key: `/${ROUTES.ENSIGN_SERVICES}`,
    en: `/${ROUTES.ENSIGN_SERVICES}`,
    ar: "/خدمات-namaa"
  },
  {
    key: `/${ROUTES.SOCIAL_MEDIA}`,
    en: `/${ROUTES.SOCIAL_MEDIA}`,
    ar: "/وسائل-التواصل-الاجتماعي"
  },
  {
    key: `/${ROUTES.WEBSITE_DESIGN}`,
    en: `/${ROUTES.WEBSITE_DESIGN}`,
    ar: "/تصميم-الموقع"
  },
  {
    key: `/${ROUTES.GRAPHIC_DESIGN}`,
    en: `/${ROUTES.GRAPHIC_DESIGN}`,
    ar: "/التصميم-الجرافيك"
  },
  {
    key: `/${ROUTES.LOGO_DESIGN}`,
    en: `/${ROUTES.LOGO_DESIGN}`,
    ar: "/تصميم-شعار"
  },
  {
    key: `/${ROUTES.WEBSITE_DEVELOPMENT}`,
    en: `/${ROUTES.WEBSITE_DEVELOPMENT}`,
    ar: "/تطوير-الموقع"
  },
  {
    key: `/${ROUTES.WEB_HOSTING}`,
    en: `/${ROUTES.WEB_HOSTING}`,
    ar: "/استضافة-الموقع"
  },
  {
    key: `/${ROUTES.WEB_MULTIMEDIA}`,
    en: `/${ROUTES.WEB_MULTIMEDIA}`,
    ar: "/ويب-الوسائط-المتعددة"
  },
  {
    key: `/${ROUTES.E_COMMERCE}`,
    en: `/${ROUTES.E_COMMERCE}`,
    ar: "/التجارة-الإلكترونية"
  },
  {
    key: `/${ROUTES.EMAIL_MARTKETING}`,
    en: `/${ROUTES.EMAIL_MARTKETING}`,
    ar: "/التسويق-عبر-البريد-الإلكتروني"
  },
  // terms
  {
    key: `/${ROUTES.LEGAL}`,
    en: `/${ROUTES.LEGAL}`,
    ar: "/إخلاء-المسؤولية-القانونية"
  },
  {
    key: `/${ROUTES.TERMS}`,
    en: `/${ROUTES.TERMS}`,
    ar: "/شروط"
  },
  {
    key: `/${ROUTES.PRIVACY}`,
    en: `/${ROUTES.PRIVACY}`,
    ar: "/سياسة-خاصة"
  }
]

export const localizationPathname = pages.reduce((acc, { key, en, ar }) => {
  acc[key] = { en, ar }
  return acc
}, {} as Record<string, { en: string; ar: string }>)
