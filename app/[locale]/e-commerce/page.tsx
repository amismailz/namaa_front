import React, { cache } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
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

  const pageKey = `/${ROUTES.E_COMMERCE}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.e_commerce.title"),
    description: t("seo.e_commerce.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      title: t("seo.e_commerce.title"),
      description: t("seo.e_commerce.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.e_commerce.title"),
      description: t("seo.e_commerce.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default function ECommercePage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.e_commerce" />}
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
          <header className="space-y-5">
            <h3 className="font-medium text-3xl">
              <Translate id="e_commerce.title" />
            </h3>

            <p className="text-muted-foreground text-lg font-light">
              <Translate id="e_commerce.p1" />
            </p>

            <p>
              <Translate id="e_commerce.p2" />
            </p>

            <p>
              <Translate id="e_commerce.p3" />
            </p>

            <Translate id="e_commerce.p4" />
          </header>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title2" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p5" />
            </p>
            <p>
              <Translate id="e_commerce.p6" />
            </p>
            <p>
              <Translate id="e_commerce.p7" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title3" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p8" />
            </p>
            <p>
              <Translate id="e_commerce.p9" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title4" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p10" />
            </p>
            <p>
              <Translate id="e_commerce.p11" />
            </p>
            <p>
              <Translate id="e_commerce.p12" />
            </p>
            <p>
              <Translate id="e_commerce.p13" />
            </p>
            <p>
              <Translate id="e_commerce.p14" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title5" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p15" />
            </p>
            <p>
              <Translate id="e_commerce.p16" />
            </p>
            <p>
              <Translate id="e_commerce.p17" />
            </p>
            <p>
              <Translate id="e_commerce.p18" />
            </p>
            <p>
              <Translate id="e_commerce.p19" />
            </p>
            <p>
              <Translate id="e_commerce.p20" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title6" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p21" />
            </p>
            <p>
              <Translate id="e_commerce.p22" />
            </p>
            <p>
              <Translate id="e_commerce.p23" />
            </p>
            <p>
              <Translate id="e_commerce.p24" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title7" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p25" />
            </p>
            <p>
              <Translate id="e_commerce.p26" />
            </p>
            <p>
              <Translate id="e_commerce.p27" />
            </p>
            <p>
              <Translate id="e_commerce.p28" />
            </p>
            <p>
              <Translate id="e_commerce.p29" />
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xl text-primary font-medium">
                <Translate id="e_commerce.title8" />
              </p>
            </div>
            <p>
              <Translate id="e_commerce.p30" />
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-10 border-t border-black/5">
        <Container className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.E_COMMERCE}`} />

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
