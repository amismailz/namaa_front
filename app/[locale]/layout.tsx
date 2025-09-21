import type { Metadata } from "next"
import { Outfit, IBM_Plex_Sans_Arabic } from "next/font/google"
import Navbar from "@/components/header/Navbar"
import Footer from "@/components/footer/Footer"
import CallToAction from "@/components/CallToAction"
import LocaleLayout from "@/providers/LocaleLayout"
import ReactQueryProvider from "@/lib/ReactQueryProvider"
import { Direction } from "@/providers/DirectionProvider"
import AnimateRoutes from "@/components/AnimateRoutes"
import { ViewTransitions } from "next-view-transitions"
import PageWrapper from "@/components/PageWrapper"
import { getContactInfo } from "@/data-layer/common"
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from "nextjs-toploader"
import { ROUTES } from "@/constants"
import WhatsAppChat from "@/components/WhatsAppChat"
import { LocaleSwitcherProvider } from "@/providers/LocaleSwitcherProvider"
import { ScrollToTop } from "@/components/ScrollToTop"
// styles
import "../globals.css"
import { localizationPathname } from "@/i18n/localizationPathname"
import { getTranslations } from "next-intl/server"

const outfit = Outfit({
  subsets: ["latin"], // Or other desired subsets
  weight: ["300", "400", "500", "600", "700"], // Or other desired weights
  variable: "--font-outfit" // Optional: for use with Tailwind CSS
})

// Arabic font
const IBMPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap" // Avoid layout shift
})

// const localeCache = cache(getLocale)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export const viewport = {
  width: "device-width", // Keeps width responsive
  initialScale: 1.0, // Default zoom level
  userScalable: true, // Allows zooming (fixes accessibility issue)
  interactiveWidget: "resizes-content", // Android widget behavior
  themeColor: "#FFFFFF",
  colorScheme: "light",
  viewportFit: "cover"
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()

  const pageKey = `/${ROUTES.HOME}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.
  
    // Get localized paths safely
    const localizedPaths = localizationPathname[pageKey] || {
      en: pageKey,
      ar: pageKey
    }

   const url =
     locale === "en"
       ? `${BASE_URL}/en${localizedPaths.en}`
       : `${BASE_URL}${localizedPaths.ar}`

  return {
    metadataBase: new URL(`${BASE_URL}`),
    title: {
      template: `%s | Namaa Agency`,
      default: `${t("seo.home.title")}`
    },
    description: `${t("seo.home.description")}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-video-preview": -1,
        "max-image-preview": "large"
      }
    },
    applicationName: "Namaa",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Namaa", url: BASE_URL }],
    creator: "Namaa Agency",
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    manifest: "/manifest.json",
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      },
      types: {
        "application/rss+xml": [
          {
            url: `${BASE_URL}/${locale}/feed.xml`, //"https://www.Namaaagency.com/feed.xml",
            title: "Namaa Agency » Feed"
          }
        ]
      }
    },
    openGraph: {
      title: `${t("seo.home.title")}`,
      type: "website",
      url: url,
      siteName: "Namaa",
      locale: locale == "ar" ? "ar_EG" : "en_US",
      description: `${t("seo.home.description")}`,
      // images: ["/Namaa-otg.png"],
      images: [
        {
          url: "/ensign-otg.png",
          secureUrl: `${BASE_URL}/ensign-otg.png`, // og:image:secure_url
          width: 1200,
          height: 630,
          alt: "social media agency egypt",
          type: "image/png"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("seo.home.title")}`,
      description: `${t("seo.home.description")}`,
      images: ["/ensign-otg.png"]
    },
    other: {
      "twitter:label1": "Written by",
      "twitter:data1": "Yh8ljrth456D18s",
      "twitter:label2": "Time to read",
      "twitter:data2": "2 minutes",
      // preconnect
      rel: "preconnect",
      href: "https://fonts.gstatic.com/",
      crossorigin: "anonymous"
    }
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const data = await getContactInfo()
  const isArabic = locale === "ar"
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <ViewTransitions>
      <html
        lang={locale}
        dir={dir}
        className={isArabic ? IBMPlexSansArabic.variable : outfit.variable}
        suppressHydrationWarning
      >
        <head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta name="apple-mobile-web-app-title" content="Ensign" />
        </head>
        <body
          className={`${
            isArabic ? IBMPlexSansArabic.variable : outfit.variable
          } antialiased`}
        >
          <NextTopLoader
            color="#518E41"
            height={2}
            speed={500}
            zIndex={9999}
            showSpinner={false}
          />

          <LocaleLayout locale={locale}>
            <ReactQueryProvider>
              <LocaleSwitcherProvider>
                <Direction direction={dir}>
                  <PageWrapper>
                    <Navbar data={data} />
                    <main className="min-h-[400px]">
                      <AnimateRoutes>
                        <ScrollToTop />
                        {children}
                      </AnimateRoutes>
                    </main>
                    <CallToAction />
                    <Footer data={data} />
                  </PageWrapper>
                  <Toaster position="bottom-center" />
                </Direction>
              </LocaleSwitcherProvider>
            </ReactQueryProvider>
          </LocaleLayout>

          <WhatsAppChat />
        </body>
      </html>
    </ViewTransitions>
  )
}
