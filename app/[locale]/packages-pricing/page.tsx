import React from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import { getHostingPlans } from "@/data-layer/package"
import { ROUTES } from "@/constants"
import { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { getSeoBySlug } from "@/data-layer/common"
import WebHostingPackages from "@/components/WebHostingPackages"
import WebsiteDesignPackage from "@/components/WebsiteDesignPackage"
import MarketingManagePackage from "@/components/MarketingManagePackage"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
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

export default async function PackagesPage() {
  const data = await getHostingPlans()

  const webHosting = data?.filter((item) => [6, 7, 8].includes(item.id))
  const webDesign = data.find((i) => i.id === 9)
  const marketManage = data.find((i) => i.id === 10)

  return (
    <>
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
