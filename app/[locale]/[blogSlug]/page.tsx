import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import Section from "@/components/Section"
import { getBlogBySlug } from "@/data-layer/blog"
import Image from "next/image"
import React, { cache } from "react"
import BlogAside from "@/components/BlogAside"
// import BlogSearch from "@/components/BlogSearch" 
import { ROUTES } from "@/constants"
import { Metadata } from "next"
import Translate from "@/components/Translate"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import FaqList from "@/components/FaqList"
import BlogPostHideLocale from "@/components/BlogPostHideLocale"
import BlogPostContent from "@/components/BlogPostContent"
import { JsonLd } from "@/components/JsonLd"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const blogBySlug = cache(getBlogBySlug)

function getDateFnsLocale(locale: string) {
  switch (locale) {
    case "ar":
      return ar
    case "en":
    default:
      return enUS
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ blogSlug: string; locale:"ar" | "en" }>
}): Promise<Metadata> {
  const { blogSlug } = await params
  const [{locale}, blogDetail] = await Promise.all([
    params,
    blogBySlug(blogSlug)
  ])

  const { post } = blogDetail

  const url =
    locale === "en"
      ? `${BASE_URL}/${locale}/${post.slug}`
      : `${BASE_URL}/${post.slug}`

  return {
    title: post.title ?? "Blog title",
    description: post.short_description ?? "blog description",
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/${post.slug}`,
        ar: `${BASE_URL}/${post.slug}`,
        "x-default": `${BASE_URL}/${post.slug}`
      }
    },
    openGraph: {
      url: url // <-- override og:url here
    },
    twitter: {
      site: url // <-- override og:url here
    }
  }
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ blogSlug: string; locale: "ar" | "en" }>
}) {
  const { blogSlug } = await params

  const [{ locale }, { post, popular }] = await Promise.all([
    params,
    blogBySlug(blogSlug)
  ])

  const dateFnsLocale = getDateFnsLocale(locale)

  const shareLink =
    locale === "ar"
      ? `${BASE_URL}/${post.slug}`
      : `${BASE_URL}/${locale}/${post.slug}`

  // ✅ Build JSON-LD Schema dynamically
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.short_description,
    image: [post.image],
    author: {
      "@type": "Person",
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
    },
    datePublished: post.published_date,
    dateModified: post.published_date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareLink
    }
  }

  return (
    <>
      <BlogPostHideLocale />

      <JsonLd schema={schemaData} id="blog-post-schema" />

      <HeroPage
        heading={post.title}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          { text: <Translate id="blog.hero_title" />, link: `/${ROUTES.BLOG}` }
        ]}
      />

      {/* <div className="block lg:hidden py-10">
        <BlogSearch />
      </div> */}

      <Section className="py-6 relative">
        <Container className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 space-y-6">
            <div className="text-muted-foreground bg-[#F7F7F7] rounded-xl p-2 text-xl flex items-center gap-1">
              <span>
                <Translate id="blog.last_modified" />:
              </span>
              <span>
                {format(new Date(post.published_date), "MMMM d, yyyy", {
                  locale: dateFnsLocale
                })}
              </span>
            </div>

            <figure>
              <Image
                src={post.image}
                width={1147}
                height={1147}
                alt={post.title}
                className="w-full rounded-xl object-cover h-auto"
              />
            </figure>

            <BlogPostContent currentUrl={shareLink} html={post.description} />

            {post.faqs && post.faqs.length > 0 ? (
              <div className="mt-5 space-y-6">
                <h4 className="font-semibold text-2xl text-primary">
                  <Translate id="navbar.faq" />
                </h4>
                <FaqList data={post.faqs} />
              </div>
            ) : null}
          </article>

          <BlogAside
            popular={popular}
            shareLink={shareLink}
            shareMessage={post.title}
          />
        </Container>
      </Section>
    </>
  )
}
