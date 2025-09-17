import React, { cache } from "react"
import Section from "@/components/Section"
import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import { ROUTES } from "@/constants"
import { getLocale, getTranslations } from "next-intl/server"
import MotionList from "./MotionList"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const translation = cache(getTranslations)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), translation()])

  const pageKey = `/${ROUTES.ENSIGN_SERVICES}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.ensign_services.title"),
    description: t("seo.ensign_services.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      title: t("seo.ensign_services.title"),
      description: t("seo.ensign_services.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.ensign_services.title"),
      description: t("seo.ensign_services.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

const ippbxList = [
  "ensign_services.box3.listing.item1",
  "ensign_services.box3.listing.item2",
  "ensign_services.box3.listing.item3",
  "ensign_services.box3.listing.item4",
  "ensign_services.box3.listing.item5",
  "ensign_services.box3.listing.item6",
  "ensign_services.box3.listing.item7",
  "ensign_services.box3.listing.item8",
  "ensign_services.box3.listing.item9",
  "ensign_services.box3.listing.item10",
  "ensign_services.box3.listing.item11",
  "ensign_services.box3.listing.item12",
  "ensign_services.box3.listing.item13",
  "ensign_services.box3.listing.item14"
]

const firewallsList = [
  "ensign_services.box4.listing.item1",
  "ensign_services.box3.listing.item2",
  "ensign_services.box3.listing.item3",
  "ensign_services.box3.listing.item4",
  "ensign_services.box3.listing.item5",
  "ensign_services.box3.listing.item6",
  "ensign_services.box3.listing.item7",
  "ensign_services.box3.listing.item8"
]

export default async function () {
  return (
    <>
      <HeroPage
        heading={<Translate id="ensign_services.hero_title" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          {
            text: <Translate id="navbar.services" />,
            link: `/${ROUTES.SERVICES}`
          }
        ]}
      />

      <Section className="py-10 lg:py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-7">
            <h3 className="font-semibold text-3xl text-primary">
              <Translate id="ensign_services.box1.title" />
            </h3>

            <div className="space-y-5 ">
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box1.p1" />
              </p>
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box1.p2" />
              </p>
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box1.p3" />
              </p>
            </div>
          </div>

          <div className=""></div>
        </Container>
      </Section>

      <Section className="py-10 lg:py-20 bg-[#F8F8F8]">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=""></div>

          <div className="space-y-7">
            <h3 className="font-semibold text-3xl text-primary">
              <Translate id="ensign_services.box2.title" />
            </h3>

            <div className="space-y-5 ">
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box2.p1" />
              </p>
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box2.p2" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 lg:py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-7">
            <h3 className="font-semibold text-3xl text-primary">
              <Translate id="ensign_services.box3.title" />
            </h3>

            <div className="space-y-5 ">
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box3.p1" />
              </p>
              <MotionList list={ippbxList} />
            </div>
          </div>

          <div className=""></div>
        </Container>
      </Section>

      <Section className="py-10 lg:py-20 bg-[#F8F8F8]">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=""></div>

          <div className="space-y-7">
            <h3 className="font-semibold text-3xl text-primary">
              <Translate id="ensign_services.box4.title" />
            </h3>

            <div className="space-y-5 ">
              <p className="text-lg leading-7">
                <Translate id="ensign_services.box4.p1" />
              </p>
              <MotionList list={firewallsList} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 lg:py-20">
        <Container>
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.ENSIGN_SERVICES}`} />
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
