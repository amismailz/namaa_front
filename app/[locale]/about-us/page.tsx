import React, { cache } from "react"
import AboutSection from "@/components/AboutSection"
import Container from "@/components/Container"
import Section from "@/components/Section"
import TitleLine from "@/components/TitleLine"
import ClientSlider2 from "@/components/CientSlider2"
import HeroPage from "@/components/HeroPage"
import AboutMarketServices from "@/components/AboutMarketServices"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
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
        "x-default": `${BASE_URL}`
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

export default async function AboutUsPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.about_us" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <AboutSection className="py-16" />

      <AboutMarketServices />

      <Section className="py-12">
        <Container>
          <div className="text-center">
            <p className="text-muted-foreground">
              <Translate id="clients.tagline" />
            </p>
            <TitleLine
              heading={<Translate id="clients.title" />}
              titleClass="text-4xl"
              className="inline-block mt-1 mb-0"
            />
          </div>

          <ClientSlider2 />
        </Container>
      </Section>
    </>
  )
}
