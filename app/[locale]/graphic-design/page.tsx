import React, { cache } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import Image from "next/image"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
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

  const pageKey = `/${ROUTES.GRAPHIC_DESIGN}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.graphic_design.title"),
    description: t("seo.graphic_design.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.graphic_design.title"),
      description: t("seo.graphic_design.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.graphic_design.title"),
      description: t("seo.graphic_design.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default function SocialMediaPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.graphic_design" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          {
            text: <Translate id="navbar.services" />,
            link: `/${ROUTES.SERVICES}`
          }
        ]}
      />

      <Section className="py-10">
        <Container className="">
          <div className="py-2 w-full flex flex-col gap-6 lg:items-center lg:gap-12 lg:grid lg:grid-cols-2">
            <div className="flex  flex-col justify-center">
              <h3 className="block lg:hidden mb-6 text-3xl lg:text-4xl font-semibold">
                <Translate id="graphic_design.box1.title" />
              </h3>
              <Image
                src="/media_tab_content.svg"
                width={500}
                height={500}
                alt="media tab icon"
                className="w-[70%] lg:w-[85%] h-auto bounce-animation"
              />
            </div>
            <div className="space-y-7">
              <h3 className="hidden lg:block mt-3 text-4xl font-semibold">
                <Translate id="graphic_design.box1.title" />
              </h3>
              <p className="text-md font-light leading-8">
                <Translate id="graphic_design.box1.p1" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 bg-[#EFEFEF]">
        <Container className="">
          <div className="py-2 w-full flex flex-col gap-6 lg:items-center lg:gap-12 lg:grid lg:grid-cols-2">
            <div className="space-y-7">
              <h3 className=" text-4xl font-semibold">
                <Translate id="graphic_design.box2.title" />
              </h3>
              <p className="text-md font-light leading-8">
                <Translate id="graphic_design.box2.p1" />
              </p>

              <p className="text-md font-light leading-8">
                <Translate id="graphic_design.box2.p2" />
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <Image
                src="/media_tab_content.svg"
                width={500}
                height={500}
                alt="media tab icon"
                className="w-[70%] lg:w-[90%] h-auto bounce-animation ltr:lg:ml-auto rtl:lg:mr-auto"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container className="">
          <div className="py-2 w-full flex flex-col gap-6 lg:items-center lg:gap-12 lg:grid lg:grid-cols-2">
            <div className="flex  flex-col justify-center">
              <h3 className="block lg:hidden mb-6 text-3xl lg:text-4xl font-semibold">
                <Translate id="graphic_design.box3.title" />
              </h3>
              <Image
                src="/media_tab_content.svg"
                width={500}
                height={500}
                alt="media tab icon"
                className="w-[70%] lg:w-[85%] h-auto bounce-animation"
              />
            </div>
            <div className="space-y-7">
              <h3 className="hidden lg:block mt-3 text-4xl font-semibold">
                <Translate id="graphic_design.box3.title" />
              </h3>
              <p className="text-md font-light leading-8">
                <Translate id="graphic_design.box3.p1" />
              </p>

              <p className="text-md font-light leading-8">
                <Translate id="graphic_design.box3.p2" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 border-t border-black/5">
        <Container className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.GRAPHIC_DESIGN}`} />
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
