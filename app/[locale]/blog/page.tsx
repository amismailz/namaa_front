import React, { Suspense } from "react"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import BlogList from "@/components/BlogList"
import { getBlogList } from "@/data-layer/blog"
import { BlogListSkeleton } from "@/components/BlogListSkeleton"
import NoResult from "@/components/NoResult"
import BlogSearchTags from "@/components/BlogSearchTags"
import { ROUTES } from "@/constants"
import { getSeoBySlug } from "@/data-layer/common"
import { Metadata } from "next"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { BlogItemType } from "@/types.type"
import { JsonLd } from "@/components/JsonLd"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getTranslations } from "next-intl/server"
import { TFunction } from "@/i18n/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
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
  params,
  searchParams
}: {
  params: Promise<{ locale: "ar" | "en" }>
  searchParams: Promise<Record<string, string>>
}) {
  const [{ locale }, queries, t] = await Promise.all([
    params,
    searchParams,
    getTranslations()
  ])

  return (
    <>
      

      <HeroPage
        heading={<Translate id="blog.hero_title" />}
        breadcrumb={[{ text: <Translate id="navbar.home" />, link: `/` }]}
      />

      <Section className="py-10">
        {queries?.search ? <BlogSearchTags searchKey={queries.search} /> : null}
        <Suspense fallback={<BlogListSkeleton count={6} />}>
          <BlogAsync queries={queries} locale={locale} t={t} />
        </Suspense>
      </Section>
    </>
  )
}

async function BlogAsync({
  locale,
  queries,
  t
}: {
  locale: "ar" | "en"
  queries: Record<string, string>
  t: TFunction
}) {
  const result = await getBlogList(queries)
  const { list, pagination } = result

  const isAr = locale === "ar"

  const pageKey = `/${ROUTES.BLOG}`

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
        "@id": `${url}#webpage`,
        url: url,
        name: isAr ? "مدونة - وكالة Namaa" : "Blog - Namaa Agency",
        description: isAr
          ? "اقرأ مقالاتنا حول التسويق الرقمي، تصميم المواقع، إدارة العلامة التجارية، والمزيد."
          : "Read our blog for insights on digital marketing, web design, branding, and more.",
        inLanguage: isAr ? "ar-EG" : "en-US",
        isPartOf: {
          "@id": `${BASE_URL}/#website`
        },
        about: {
          "@id": `${BASE_URL}/#organization`
        }
      },
      {
        "@type": "Blog",
        name: isAr ? "مقالات Namaa" : "Namaa Blog",
        blogPost: (list as BlogItemType[]).map((item) => ({
          "@type": "BlogPosting",
          headline: item.title,
          url: isAr
            ? `${BASE_URL}/${item.slug}/`
            : `${BASE_URL}/en/${item.slug}/`,
          image: item.image,
          datePublished: item.created_at,
          dateModified: item.published_date,
          description: item.short_description,
          author: {
            "@type": "Organization",
            name: "Namaa Agency",
            url: BASE_URL
          },
          publisher: {
            "@type": "Organization",
            name: "Namaa Agency",
            logo: {
              "@type": "ImageObject",
              url: `${BASE_URL}/NAMAA_LOGO.svg`
            }
          }
        }))
      }
    ]
  }

  if (!list || list.length === 0) {
    return <NoResult />
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-${url}`}
        items={[
          { name: t("navbar.home"), localed: true, url: `${BASE_URL}/` },
          { name: t("navbar.blog"), url: `${url}/` }
        ]}
      />
      <JsonLd schema={schema} id="blog-schema" />
      <BlogList data={list} />
    </>
  )
}
