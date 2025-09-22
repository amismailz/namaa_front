import React, { Suspense } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import { getPortofilioList } from "@/data-layer/portofilio"
import PortofilioList from "@/components/PortofilioList"
import PortofilioFilterationNav from "@/components/PortofilioFilterationNav"
import { PortfolioProvider } from "@/providers/PortfolioProvider"
import { MasonrySkeleton } from "@/components/MasonerySkeleton"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { JsonLd } from "@/components/JsonLd"
import { ProtfolioType } from "@/types.type"
import NoResult from "@/components/NoResult"

type PageParams = {
  params: Promise<{ locale: "ar" | "en" }>
  searchParams: Promise<{ page: string; service_slug: string }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
    getSeoBySlug("portfolio")
  ])

  const pageKey = `/${ROUTES.PORTOFILIO}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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

export default async function PortfolioPage({
  params,
  searchParams
}: PageParams) {
  const { locale } = await params
  const { page, service_slug } = await searchParams

  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.portfilio" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-12">
        <Container className="mt-5 space-y-10">
          <h2 className="mx-auto text-center font-semibold text-primary text-2xl lg:text-3xl">
            <Translate id="portfilio.title" />
          </h2>
          <Suspense fallback={<MasonrySkeleton />}>
            <PortofiliAsync
              page={page}
              service_slug={service_slug}
              locale={locale}
            />
          </Suspense>
        </Container>
      </Section>
    </>
  )
}

async function PortofiliAsync({
  page,
  service_slug,
  locale
}: {
  page: string
  service_slug: string
  locale: "ar" | "en"
}) {
  const { list, pagination, filters } = await getPortofilioList({
    page,
    service_slug
  })

  const isAr = locale === "ar"

  const pageKey = `/${ROUTES.PORTOFILIO}`

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url = isAr
    ? `${BASE_URL}${localizedPaths.ar}`
    : `${BASE_URL}/${locale}${localizedPaths.en}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/${locale}/portfolio/#webpage`,
        url: url,
        name: isAr ? "أعمالنا - وكالة Namaa" : "Portfolio - Namaa Agency",
        description: isAr
          ? "اكتشف أعمالنا الإبداعية في تصميم المواقع، تطوير العلامة التجارية، إدارة السوشيال ميديا، والتسويق الإلكتروني."
          : "Discover our creative portfolio showcasing projects in web design, branding, and social media marketing.",
        inLanguage: isAr ? "ar-EG" : "en-US",
        isPartOf: {
          "@id": `${BASE_URL}/#website`
        },
        about: {
          "@id": `${BASE_URL}/#organization`
        }
      },
      {
        "@type": "CollectionPage",
        name: isAr ? "أعمالنا" : "Our Portfolio",
        hasPart: (list as ProtfolioType[]).map((item) => ({
          "@type": "CreativeWork",
          name: item.title,
          image: item.image,
          description: item.description
        }))
      }
    ]
  }

  return (
    <>
      <JsonLd schema={schema} id="portfilio-schema" />

      <PortofilioFilterationNav service_slug={service_slug} filters={filters} />

      {list && list.length > 0 ? (
        <PortfolioProvider
          initialData={list}
          initialPagination={pagination}
          initialServiceSlug={service_slug}
        >
          <PortofilioList />
        </PortfolioProvider>
      ) : (
        <NoResult />
      )}
    </>
  )
}
