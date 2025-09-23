import React from "react"
import AboutSection from "@/components/AboutSection"
import HeroPage from "@/components/HeroPage"
import AboutMarketServices from "@/components/AboutMarketServices"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { JsonLd } from "@/components/JsonLd"
import { getAboutUs } from "@/data-layer/about"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{locale}, results] = await Promise.all([
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
    ...results,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      url: url // <-- override og:url here
    },
    twitter: {
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
  const data = await getAboutUs()
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
          streetAddress:
            "78 \u0634\u0627\u0631\u0639 \u062c\u0633\u0631 \u0627\u0644\u0633\u0648\u064a\u0633\u060c \u0631\u0648\u0643\u0633\u064a\u060c \u0627\u0644\u062f\u0648\u0631 2\u060c \u0645\u0643\u062a\u0628 4\u060c \u0628\u0631\u062c \u0642\u0635\u0631 \u0627\u0644\u0637\u0627\u0647\u0631\u0629",
          addressLocality: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629",
          addressRegion:
            "\u062c\u0633\u0631 \u0627\u0644\u0633\u0648\u064a\u0633",
          postalCode: "11331",
          addressCountry: "SA"
        }
      },
      {
        "@type": ["Corporation", "Organization"],
        "@id": `${BASE_URL}/#organization`,
        name: "Namaa Agency",
        url: `${BASE_URL}`,
        email: "info@namaasolutions.com",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "78 \u0634\u0627\u0631\u0639 \u062c\u0633\u0631 \u0627\u0644\u0633\u0648\u064a\u0633\u060c \u0631\u0648\u0643\u0633\u064a\u060c \u0627\u0644\u062f\u0648\u0631 2\u060c \u0645\u0643\u062a\u0628 4\u060c \u0628\u0631\u062c \u0642\u0635\u0631 \u0627\u0644\u0637\u0627\u0647\u0631\u0629",
          addressLocality: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629",
          addressRegion:
            "\u062c\u0633\u0631 \u0627\u0644\u0633\u0648\u064a\u0633",
          postalCode: "11331",
          addressCountry: "SA"
        },
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/NAMAA_LOGO.svg`,
          caption: "Namaa Agency",
          inLanguage: isAr ? "ar-SA" : "en-US",
          width: "1000",
          height: "615"
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+966536322194",
            contactType: "customer support"
          }
        ],
        description:
          "\u0648\u0643\u0627\u0644\u0629 Namaa \u0647\u064a \u0648\u0643\u0627\u0644\u0629 \u062a\u0633\u0648\u064a\u0642 \u0631\u0642\u0645\u064a \u0645\u062a\u0643\u0627\u0645\u0644\u0629 \u062a\u064f\u0642\u062f\u0651\u0645 \u062e\u062f\u0645\u0627\u062a \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0641\u064a \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u0648\u0627\u0642\u0639\u060c \u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0628\u0631\u0627\u0646\u062f\u060c \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0633\u0648\u0634\u064a\u0627\u0644 \u0645\u064a\u062f\u064a\u0627\u060c \u0648\u062e\u0637\u0637 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0627\u0644\u0645\u062e\u0635\u0635\u0629. \u0646\u0633\u0627\u0639\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0639\u0644\u0649 \u0628\u0646\u0627\u0621 \u062d\u0636\u0648\u0631 \u0631\u0642\u0645\u064a \u0642\u0648\u064a \u0648\u062c\u0630\u0628 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0641\u0639\u0651\u0627\u0644\u0629 \u0648\u0645\u062d\u062a\u0648\u0649 \u0645\u0645\u064a\u0632. \u062e\u0628\u0631\u062a\u0646\u0627 \u062a\u0634\u0645\u0644 \u0627\u0644\u062a\u0639\u0627\u0648\u0646 \u0645\u0639 \u0634\u0631\u0643\u0627\u062a \u0645\u062d\u0644\u064a\u0629 \u0648\u0639\u0627\u0644\u0645\u064a\u0629 \u0639\u0628\u0631 \u0645\u062e\u062a\u0644\u0641 \u0627\u0644\u0642\u0637\u0627\u0639\u0627\u062a.\r\n\r\n\u0646\u062d\u0646 \u0646\u0639\u0645\u0644 \u0639\u0644\u0649 \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0623\u0641\u0643\u0627\u0631 \u0625\u0644\u0649 \u0646\u062a\u0627\u0626\u062c\u060c \u0648\u0646\u0633\u0639\u0649 \u062f\u0627\u0626\u0645\u064b\u0627 \u0644\u062a\u062d\u0642\u064a\u0642 \u0646\u0645\u0648 \u0641\u0639\u0644\u064a \u0644\u0639\u0644\u0627\u0645\u062a\u0643 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629.",
        legalName:
          "\u0648\u0643\u0627\u0644\u0629 \u062d\u0627\u0645\u0644 \u0627\u0644\u0631\u0627\u064a\u0629",
        location: { "@id": `${BASE_URL}/#place` }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}`,
        name: "Namaa Agency",
        alternateName:
          "\u0648\u0643\u0627\u0644\u0629 \u062d\u0627\u0645\u0644 \u0627\u0644\u0631\u0627\u064a\u0629",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: isAr ? "ar-SA" : "en-US"
      },
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url: url,
        name: "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646\u0627 Namaa Agency",
        datePublished: "2020-09-05T09:42:36+02:00",
        dateModified: "2025-02-11T13:43:42+02:00",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        primaryImageOfPage: `${BASE_URL}/ensign-otg.png`,
        inLanguage: isAr ? "ar-SA" : "en-US"
      }
    ]
  }

  return (
    <>
      <JsonLd schema={schema} id="about-schema" />
      <HeroPage
        heading={<Translate id="navbar.about_us" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <AboutSection className="py-16" data={data} />

      <AboutMarketServices />
    </>
  )
}
