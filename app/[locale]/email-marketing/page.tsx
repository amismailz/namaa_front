import React, { cache, Suspense } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ROUTES } from "@/constants"
import { getLocale, getTranslations } from "next-intl/server"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const translation = cache(getTranslations)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), translation()])

  const pageKey = `/${ROUTES.EMAIL_MARTKETING}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.email_marketing.title"),
    description: t("seo.email_marketing.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.email_marketing.title"),
      description: t("seo.email_marketing.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.email_marketing.title"),
      description: t("seo.email_marketing.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default function EmailMarketingPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.email_marketing" />}
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
          <header className="space-y-3">
            <h3 className="font-medium text-3xl">
              <Translate id="email_marketing.title" />
            </h3>

            <p className="text-xl text-primary font-light">
              <Translate id="email_marketing.subtitle" />
            </p>
          </header>
          <div className="font-light text-lg space-y-7">
            <p>
              <Translate id="email_marketing.p1" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-light">
                <Translate id="email_marketing.title2" />
              </p>
              <p className="text-muted-foreground">
                <Translate id="email_marketing.subtitle2" />
              </p>
            </div>
            <p>
              <Translate id="email_marketing.p2" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-light">
                <Translate id="email_marketing.title3" />
              </p>
            </div>
            <p>
              <Translate id="email_marketing.p3" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-light">
                <Translate id="email_marketing.title4" />
              </p>
            </div>
            <p>
              <Translate id="email_marketing.p4" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-light">
                <Translate id="email_marketing.title5" />
              </p>
            </div>
            <p>
              <Translate id="email_marketing.p5" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-light">
                <Translate id="email_marketing.title6" />
              </p>
            </div>
            <p>
              <Translate id="email_marketing.p6" />
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-10 border-t border-black/5">
        <Container className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.EMAIL_MARTKETING}`} />
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
