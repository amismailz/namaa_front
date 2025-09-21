import React, { cache } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
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

  const pageKey = `/${ROUTES.WEBSITE_DESIGN}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.website_design.title"),
    description: t("seo.website_design.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.website_design.title"),
      description: t("seo.website_design.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.website_design.title"),
      description: t("seo.website_design.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default function WebDesignPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.website_design" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          {
            text: <Translate id="navbar.services" />,
            link: `/${ROUTES.SERVICES}`
          }
        ]}
      />

      <Section className="py-10">
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="col-span-1 lg:col-span-2 space-y-7 lg:space-y-10">
            <figure>
              <Image
                src="/services/website-design/1.jpg"
                width={1034}
                height={596}
                alt="image of web design 1"
                className="w-auto h-full object-cover"
              />
            </figure>

            <header>
              <h3 className="font-medium text-3xl">
                <Translate id="website_design.box1.title" />
              </h3>
            </header>

            <div className="font-light text-lg space-y-7">
              <p>
                <Translate id="website_design.box1.p1" />
              </p>

              <p>
                <Translate id="website_design.box1.p2" />
              </p>
            </div>
          </div>
          <div className="col-span-1 lg:cols-span-1 space-y-7 lg:space-y-10">
            <figure>
              <Image
                src="/services/website-design/2.jpg"
                width={594}
                height={596}
                alt="image of web design 2"
                className="w-auto h-full object-cover"
              />
            </figure>

            <header>
              <h3 className="font-medium text-3xl">
                <Translate id="website_design.box2.title" />
              </h3>
            </header>

            <div className="font-light text-lg space-y-7">
              <p>
                <Translate id="website_design.box2.p1" />
              </p>

              <p>
                <Translate id="website_design.box2.p2" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-12 pb-20 bg-[#F9F9F9]">
        <Container>
          <h3 className="font-medium text-3xl">
            <Translate id="website_design.box3.title" />
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-center lg:items-center gap-6 lg:gap-10">
            <figure>
              <Image
                src="/services/website-design/3.svg"
                width={732}
                height={610}
                alt="image of web design 3"
                className="w-[86%] h-auto object-cover"
              />
            </figure>
            <div className="flex flex-col gap-12">
              <article className="flex flex-col gap-2">
                <header className="flex items-center text-lg justify-between font-medium gap-2">
                  <p>
                    <Translate id="website_design.box3.progress.item1" />
                  </p>
                  <span>97%</span>
                </header>
                <div className="">
                  <Progress value={97} className="h-5" />
                </div>
              </article>

              <article className="flex flex-col gap-2">
                <header className="flex items-center text-lg justify-between font-medium gap-2">
                  <p>
                    <Translate id="website_design.box3.progress.item2" />
                  </p>
                  <span>85%</span>
                </header>
                <div className="">
                  <Progress value={85} className="h-5" />
                </div>
              </article>

              <article className="flex flex-col gap-2">
                <header className="flex items-center text-lg justify-between font-medium gap-2">
                  <p>
                    <Translate id="website_design.box3.progress.item3" />
                  </p>
                  <span>95%</span>
                </header>
                <div className="">
                  <Progress value={95} className="h-5" />
                </div>
              </article>

              <article className="flex flex-col gap-2">
                <header className="flex items-center text-lg justify-between font-medium gap-2">
                  <p>
                    <Translate id="website_design.box3.progress.item4" />
                  </p>
                  <span>80%</span>
                </header>
                <div className="">
                  <Progress value={80} className="h-5" />
                </div>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 border-t border-black/5">
        <Container className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog />
            <ServiceWhatsAppButton currentUrl={`/${ROUTES.WEBSITE_DESIGN}`} />
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
