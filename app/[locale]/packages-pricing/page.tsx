import React from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import { getHostingPlans } from "@/data-layer/package"
import { ROUTES } from "@/constants"
import { Metadata } from "next"
import { getSeoBySlug } from "@/data-layer/common"
import WebHostingPackages from "@/components/WebHostingPackages"
import WebsiteDesignPackage from "@/components/WebsiteDesignPackage"
import MarketingManagePackage from "@/components/MarketingManagePackage"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { JsonLd } from "@/components/JsonLd"
import { HostingPlansType } from "@/types.type"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
    getSeoBySlug("hosting-plans")
  ])

  const pageKey = `/${ROUTES.PACKAGES}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
      ...results,
      url: url // <-- override og:url here
    },
    twitter: {
      ...results,
      card: "summary_large_image",
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default async function PackagesPage({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const { locale } = await params
  const data = await getHostingPlans()

  const webHosting = data?.filter((item) => [6, 7, 8].includes(item.id))
  const webDesign = data.find((i) => i.id === 9)
  const marketManage = data.find((i) => i.id === 10)

  const isAr = locale === "ar"

  const pageKey = `/${ROUTES.PACKAGES}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url =
    locale === "en"
      ? `${BASE_URL}/en${localizedPaths.en}`
      : `${BASE_URL}${localizedPaths.ar}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url: url,
        name: isAr
          ? "باقات الأسعار - وكالة Namaa"
          : "Packages & Pricing - Namaa Agency",
        description: isAr
          ? "استعرض خطط الاستضافة، تصميم المواقع، وإدارة التسويق لدينا بأسعار مناسبة لمختلف الاحتياجات."
          : "Browse our hosting plans, website design packages, and marketing management solutions with transparent pricing.",
        inLanguage: isAr ? "ar-SA" : "en-US",
        isPartOf: {
          "@id": `${BASE_URL}/#website`
        },
        about: {
          "@id": `${BASE_URL}/#organization`
        }
      },
      {
        "@type": "ItemList",
        name: isAr
          ? "باقات الاستضافة والتصميم والتسويق"
          : "Hosting, Design, and Marketing Packages",
        itemListElement: (data as HostingPlansType[]).map(
          (pkg, index: number) => ({
            "@type": "Product",
            position: index + 1,
            name: pkg.name,
            // description: isAr ? pkg.description_ar : pkg.description_en,
            // image: pkg.image_url,
            offers: {
              "@type": "Offer",
              priceCurrency: pkg.currency, // adjust if you use EGP, SAR, etc.
              price: pkg.price
              // availability: "https://schema.org/InStock"
            }
          })
        )
      }
    ]
  }

  return (
    <>
      <JsonLd schema={schema} id="pricing-schema" />

      <HeroPage
        heading={<Translate id="navbar.packages" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-12">
        <Container className="space-y-10 lg:space-y-20">
          <WebHostingPackages
            data={webHosting}
            heading={<Translate id="package_pricing.website_hosting" />}
          />

          {webDesign ? (
            <WebsiteDesignPackage
              item={webDesign}
              heading={<Translate id="package_pricing.website_design" />}
            />
          ) : null}

          {/* marketing */}
          {marketManage ? (
            <MarketingManagePackage
              item={marketManage}
              heading={<Translate id="package_pricing.marketing_package" />}
            />
          ) : null}
        </Container>
      </Section>
    </>
  )
}
