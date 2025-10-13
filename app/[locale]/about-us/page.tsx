import React from "react"
import AboutSection from "@/components/AboutSection"
import HeroPage from "@/components/HeroPage"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { JsonLd } from "@/components/JsonLd"
import { getAboutUs } from "@/data-layer/about"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getTranslations } from "next-intl/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
    getSeoBySlug("about-us")
  ])

  const pageKey = `/${ROUTES.ABOUT_US}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: results.title || undefined, // undefined = use layout default
    description: results.description || results.og_description || undefined,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: results.title || undefined,
      description: results.og_description || results.description || undefined,
      images: results.og_image ? [{ url: results.og_image }] : undefined,
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: results.title || undefined,
      description:
        results.twitter_description || results.description || undefined,
      images: results.twitter_image ? [results.twitter_image] : undefined,
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default async function AboutUsPage({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const { locale } = await params
  const [t, data] = await Promise.all([getTranslations(), getAboutUs()])
  const isAr = locale === "ar"

  const pageKey = `/${ROUTES.ABOUT_US}`

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url = isAr
    ? `${BASE_URL}${localizedPaths.ar}`
    : `${BASE_URL}/en${localizedPaths.en}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": `${BASE_URL}/#place`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: "30.09643",
          longitude: "31.31116"
        },
        hasMap:
          "https://www.google.com/maps/search/?api=1&amp;query=30.09643,31.31116",
        address: {
          "@type": "PostalAddress",
          streetAddress: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى , مكه المكرمه , المملكه العربيه السعودية 1111"
            : " Umm Al-Qura University , 4299, 7310, wadi Makkah 24381",
          addressLocality: isAr ? "مكه" : "Macca",
          addressRegion: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى"
            : "Umm Al-Qura University",
          postalCode: "11331",
          addressCountry: "SA"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#LocalBusiness`,
        name: isAr ? "وكالة نماء" : "Namaa Agency",
        url: `${BASE_URL}`,
        email: "info@namaasolutions.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى , مكه المكرمه , المملكه العربيه السعودية 1111"
            : " Umm Al-Qura University , 4299, 7310, wadi Makkah 24381",
          addressLocality: isAr ? "مكه" : "Macca",
          addressRegion: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى"
            : "Umm Al-Qura University",
          postalCode: "11331",
          addressCountry: "SA"
        },
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/NAMAA_LOGO.png`,
          caption: isAr ? "وكالة نماء" : "Namaa Agency",
          inLanguage: isAr ? "ar-SA" : "en-US",
          width: "1000",
          height: "615"
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+966536322194",
            contactType: isAr ? "الدعم الفني" : "customer support"
          }
        ],
        description: isAr
          ? "وكالة نماء هي وكالة تسويق رقمي متكاملة الخدمات تقدم خدمات احترافية في تصميم المواقع الإلكترونية، وبناء العلامات التجارية، وإدارة وسائل التواصل الاجتماعي، واستراتيجيات التسويق الإلكتروني المصممة خصيصًا"
          : "Namaa Agency is a full-service digital marketing agency offering professional services in web design, branding, social media management, and tailored online marketing strategies.",
        legalName: isAr ? "وكالة حامل الراية" : "Namaa Agency",
        location: { "@id": `${BASE_URL}/#place` }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}`,
        name: isAr ? "وكالة نماء" : "Namaa Agency",
        alternateName: isAr ? "نماء" : "Namma",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: isAr ? "ar-SA" : "en-US"
      },
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url: url,
        name: isAr
          ? "نماء: أفضل-شركات-التسويق-الإلكترونى-عبر-الإنترنت"
          : "Namaa Agency",
        datePublished: "2020-09-05T09:42:36+02:00",
        dateModified: "2025-02-11T13:43:42+02:00",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        primaryImageOfPage: `${BASE_URL}/namaa-otg.jpg`,
        inLanguage: isAr ? "ar-SA" : "en-US"
      }
    ]
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-${url}`}
        items={[
          { name: t("navbar.home"), url: `${BASE_URL}/` },
          { name: t("navbar.about_us"), url: url }
        ]}
      />
      <JsonLd schema={schema} id="about-schema" />
      <HeroPage
        heading={<Translate id="navbar.about_us" />}
        breadcrumb={[{ text: <Translate id="navbar.home" />, link: `/` }]}
      />

      <AboutSection className="py-16" data={data} />
    </>
  )
}
