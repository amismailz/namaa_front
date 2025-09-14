import React, { cache } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
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
    title: t("seo.logo_design.title"),
    description: t("seo.logo_design.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      title: t("seo.logo_design.title"),
      description: t("seo.logo_design.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.logo_design.title"),
      description: t("seo.logo_design.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default function LogoDesignPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.logo_design" />}
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
          <header className="space-y-4">
            <h3 className="font-medium text-3xl">
              <Translate id="logo_design.title" />
            </h3>
            <p className="text-lg font-light text-muted-foreground">
              <Translate id="logo_design.p1" />
            </p>
          </header>

          <div className="space-y-7">
            {/* 1 */}
            <div className="font-light text-lg space-y-5">
              <header className="space-y-4">
                <p className="font-medium text-lg text-primary">
                  <Translate id="logo_design.title2" />
                </p>
              </header>
              <p>
                <Translate id="logo_design.p2" />
              </p>
            </div>

            {/* 2 */}
            <div className="font-light text-lg space-y-5">
              <header className="space-y-4">
                <p className="font-medium text-lg text-primary">
                  <Translate id="logo_design.title3" />
                </p>
              </header>
              <p>
                <Translate id="logo_design.p3" />
              </p>
            </div>

            {/* 3 */}
            <div className="font-light text-lg space-y-5">
              <header className="space-y-4">
                <p className="font-medium text-lg text-primary">
                  <Translate id="logo_design.title4" />
                </p>
              </header>
              <p>
                <Translate id="logo_design.p4" />
              </p>
            </div>

            {/* 4 */}
            <div className="font-light text-lg space-y-5">
              <header className="space-y-4">
                <p className="font-medium text-lg text-primary">
                  <Translate id="logo_design.title5" />
                </p>
              </header>
              <p>
                <Translate id="logo_design.p5" />
              </p>
            </div>

            {/* 5 */}
            <div className="font-light text-lg space-y-5">
              <header className="space-y-4">
                <p className="font-medium text-lg text-primary">
                  <Translate id="logo_design.title6" />
                </p>
              </header>
              <p>
                <Translate id="logo_design.p6" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 border-t border-black/5">
        <Container className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.LOGO_DESIGN}`} />
            <Button variant="link" size="icon" asChild>
              <a href="tel:201148898881" target="_blank" rel="nofollow">
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
