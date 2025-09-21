import React, { Suspense } from "react"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import BlogList from "@/components/BlogList"
import { getBlogList } from "@/data-layer/blog"
import { BlogListSkeleton } from "@/components/BlogListSkeleton"
import NoResult from "@/components/NoResult"
import BlogSearchTags from "@/components/BlogSearchTags"
import { ROUTES } from "@/constants"
import { getLocale } from "next-intl/server"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
    getSeoBySlug("blogs")
  ])

  const pageKey = `/${ROUTES.BLOG}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const queries = await searchParams
  return (
    <>
      <HeroPage
        heading={<Translate id="blog.hero_title" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-10">
        {queries?.search ? <BlogSearchTags searchKey={queries.search} /> : null}
        <Suspense fallback={<BlogListSkeleton count={6} />}>
          <BlogAsync queries={queries} />
        </Suspense>
      </Section>
    </>
  )
}

async function BlogAsync({ queries }: { queries: Record<string, string> }) {
  const result = await getBlogList(queries)
  const { list, pagination } = result

  if (!list || list.length === 0) {
    return <NoResult />
  }

  return <BlogList data={list} />
}
