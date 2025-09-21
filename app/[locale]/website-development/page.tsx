import React, { cache } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import ListingMotion from "./ListingMotion"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { getLocale, getTranslations } from "next-intl/server"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const translation = cache(getTranslations)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), translation()])

  const pageKey = `/${ROUTES.LOGO_DESIGN}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.website_development.title"),
    description: t("seo.website_development.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.website_development.title"),
      description: t("seo.website_development.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.website_development.title"),
      description: t("seo.website_development.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
} 

export default function WebSiteDevelopmentPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.website_development" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          {
            text: <Translate id="navbar.services" />,
            link: `/${ROUTES.SERVICES}`
          }
        ]}
      />

      <Section className="py-10">
        <Container className="space-y-10">
          <header>
            <h3 className="font-medium text-3xl">
              <Translate id="website_development.title" />
            </h3>
          </header>

          <div className="font-light text-lg space-y-7">
            <p>
              <Translate id="website_development.p1" />
            </p>

            <ListingMotion />

            <p>
              <Translate id="website_development.p2" />
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton
              currentUrl={`/${ROUTES.WEBSITE_DEVELOPMENT}`}
            />
            <Button variant="link" size="icon" asChild>
              <a href="tel:201148898881" target="_blank" rel="follow">
                <Image
                  src="/call-icon.svg"
                  width={36}
                  height={36}
                  alt="call icon"
                />
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
