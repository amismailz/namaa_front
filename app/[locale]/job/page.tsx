import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import JobsList from "@/components/JobsList"
import NoResult from "@/components/NoResult"
import Section from "@/components/Section"
import Translate from "@/components/Translate"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { getJobsList } from "@/data-layer/jobs"
import { localizationPathname } from "@/i18n/localizationPathname"
import { Metadata } from "next"
import { getLocale } from "next-intl/server"
import React, { Suspense } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
    getSeoBySlug("jobs")
  ])

  const pageKey = `/${ROUTES.JOB}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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

const JobsPage = () => {
  return (
    <>
      <HeroPage
        heading={<Translate id="jobs.hero_title" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.JOB}` }
        ]}
      />

      <Section className="py-10">
        <Container className="space-y-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-primary ">
            <Translate id="jobs.title" />
          </h2>
          <p className="font-light text-xl leading-7 text-muted-foreground">
            <Translate id="jobs.descraption" />
          </p>
        </Container>
      </Section>

      <Suspense fallback={null}>
        <JobsAsync />
      </Suspense>
    </>
  )
}

async function JobsAsync() {
  const data = await getJobsList()

  if (!data || data.length === 0) {
    return <NoResult />
  }

  return <JobsList data={data} />
}

export default JobsPage
