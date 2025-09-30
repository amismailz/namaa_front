import { ROUTES } from "@/constants"

const pages = [
  { key: `/`, en: `/`, ar: "/" },
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
