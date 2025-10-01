import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import JobsList from "@/components/JobsList"
import { JsonLd } from "@/components/JsonLd"
import NoResult from "@/components/NoResult"
import Section from "@/components/Section"
import Translate from "@/components/Translate"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { getJobsList } from "@/data-layer/jobs"
import { localizationPathname } from "@/i18n/localizationPathname"
import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
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
    title: results.title || undefined, // undefined = use layout default
    description: results.description || results.og_description || undefined,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: results.title || undefined,
      description: results.og_description || results.description || undefined,
      images: results.og_image ? [{ url: results.og_image }] : undefined,
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: results.title || undefined,
      description:
        results.twitter_description || results.description || undefined,
      images: results.twitter_image ? [results.twitter_image] : undefined,
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default async function JobsPage({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const { locale } = await params

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
        <JobsAsync locale={locale} />
      </Suspense>
    </>
  )
}

async function JobsAsync({ locale }: { locale: "ar" | "en" }) {
  const [t, data] = await Promise.all([getTranslations(),getJobsList()])
  const isAr = locale === "ar"

  if (!data || data.length === 0) {
    return <NoResult />
  }

  const pageKey = `/${ROUTES.JOB}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url =
    locale === "en"
      ? `${BASE_URL}/${locale}${localizedPaths.en}`
      : `${BASE_URL}${localizedPaths.ar}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isAr ? "وظائف نماء" : "Jobs - Careers at Namaa",
    url: `${url}`,
    description: isAr
      ? "استعرض فرص العمل المتاحة وانضم إلى فريقنا."
      : "Explore current job openings and join our team.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: data?.map((job, index) => ({
        "@type": "JobPosting",
        position: index + 1,
        title: job.title,
        description: job.description,
        datePosted: job.created_at // If available, else remove
      }))
    }
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-${url}`}
        items={[
          { name: t("navbar.home"), localed: true, url: `${BASE_URL}/` },
          { name: t("navbar.jobs"), url: `${url}/` }
        ]}
      />
      <JsonLd schema={schema} id="jobs-schema" />
      <JobsList data={data} />
    </>
  )
}
