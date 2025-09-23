import React, { Suspense } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import TitleLine from "@/components/TitleLine"
import ClientSlider2 from "@/components/CientSlider2"
import HeroPage from "@/components/HeroPage"
import ServicesTabs from "@/components/ServicesTabs"
import Image from "next/image"
import { Loader } from "lucide-react"
import ServicesCallToAction from "@/components/ServicesCallToAction"
import { ROUTES } from "@/constants"
import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { getServices } from "@/data-layer/services"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  const pageKey = `/${ROUTES.SERVICES}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.services.title"),
    description: t("seo.services.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.services.title"),
      description: t("seo.services.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.services.title"),
      description: t("seo.services.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
} 

export default function ServicesPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="services.hero_title" />}
        description={<Translate id="services.hero_subtitle" />}
        breadcrumb={[
          {
            text: <Translate id="navbar.home" />,
            link: `/${ROUTES.HOME}`
          }
        ]}
      />

      <Section className="py-10 lg:py-20">
        <Container>
          <div className="mb-14 space-y-3">
            <span className="text-primary font-light text-lg">
              <Translate id="services.tagline" />
            </span>
            <h2 className="text-2xl lg:text-4xl font-semibold">
              <Translate id="services.title" />
            </h2>

            <div className="">
              <p className=" text-lg font-light leading-7 mt-6">
                <Translate id="services.descraption" />
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="p-10 flex justify-center items-center">
                <Loader className="animate-spin text-primary size-6" />
              </div>
            }
          >
            <ServicesAsync />
          </Suspense>
        </Container>
      </Section>

      <Section className="pt-12 pb-20">
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="flex flex-col gap-6">
            <header className="flex flex-row gap-6 items-center">
              <Image
                alt="increase sells icon"
                src="/increase-sells.svg"
                height={70}
                width={70}
              />
              <h5 className="text-2xl font-medium">
                <Translate id="services.box1.title" />
              </h5>
            </header>
            <div className="leading-7 font-light">
              <p className="text-muted-foreground">
                <Translate id="services.box1.descraption" />
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:gap-6">
            <header className="flex flex-row gap-6 items-center">
              <Image
                alt="increase sells icon"
                src="/increase-sells.svg"
                height={70}
                width={70}
              />
              <h5 className="text-2xl font-medium">
                <Translate id="services.box2.title" />
              </h5>
            </header>
            <div className="leading-7 font-light">
              <p className="text-muted-foreground">
                <Translate id="services.box2.descraption" />
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <header className="flex flex-row gap-6 items-center">
              <Image
                alt="increase sells icon"
                src="/increase-sells.svg"
                height={70}
                width={70}
              />
              <h5 className="text-2xl font-medium">
                <Translate id="services.box3.title" />
              </h5>
            </header>
            <div className="leading-7 font-light">
              <p className="text-muted-foreground">
                <Translate id="services.box3.descraption" />
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <ServicesCallToAction />
    </>
  )
}

async function ServicesAsync() {
  const data = await getServices()

  if (!data) return null 

  return <ServicesTabs showMore={true} data={data} />
}

