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
import { getLocale } from "next-intl/server"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

type PageParams = {
  searchParams: Promise<{ page: string; service_slug: string }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
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
        "x-default": BASE_URL
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

export default async function PortfolioPage({ searchParams }: PageParams) {
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
            <PortofiliAsync page={page} service_slug={service_slug} />
          </Suspense>
        </Container>
      </Section>
    </>
  )
}

async function PortofiliAsync({
  page,
  service_slug
}: {
  page: string
  service_slug: string
}) {
  const { list, pagination, filters } = await getPortofilioList({
    page,
    service_slug
  })

  return (
    <>
      <PortofilioFilterationNav service_slug={service_slug} filters={filters} />

      <PortfolioProvider
        initialData={list}
        initialPagination={pagination}
        initialServiceSlug={service_slug}
      >
        <PortofilioList />
      </PortfolioProvider>
    </>
  )
}
