import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import Section from "@/components/Section"
import { getBlogBySlug } from "@/data-layer/blog"
import Image from "next/image"
import React, { cache } from "react"
import BlogAside from "@/components/BlogAside"
import BlogSearch from "@/components/BlogSearch"
import { ROUTES } from "@/constants"
import { Metadata } from "next"
import { getLocale } from "next-intl/server"
import Translate from "@/components/Translate"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import FaqList from "@/components/FaqList"
import BlogPostHideLocale from "@/components/BlogPostHideLocale"
import { cn } from "@/lib/utils"

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
  params: Promise<{ blogSlug: string }>
}): Promise<Metadata> {
  const { blogSlug } = await params
  const [locale, blogDetail] = await Promise.all([
    getLocale(),
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
        "x-default": `${BASE_URL}`
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
  params: Promise<{ blogSlug: string }>
}) {
  const { blogSlug } = await params

  const [locale, { post, popular }] = await Promise.all([
    getLocale(),
    blogBySlug(blogSlug)
  ])

  const dateFnsLocale = getDateFnsLocale(locale) 

  const shareLink =
    locale === "ar"
      ? `${BASE_URL}/${post.slug}`
      : `${BASE_URL}/${locale}/${post.slug}`

  return (
    <>
      <BlogPostHideLocale />

      <HeroPage
        heading={post.title}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          { text: <Translate id="blog.hero_title" />, link: `/${ROUTES.BLOG}` }
        ]}
      />

      <div className="block lg:hidden py-10">
        <BlogSearch />
      </div>

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

            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className={cn(
                `prose lg:prose-lg max-w-full prose-a:text-green-600 prose-a:hover:text-green-700 prose-a:underline prose-a:font-medium prose-headings:text-primary prose-img:rounded-xl prose-img:max-w-full prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5-text-lg prose-h5:font-bold prose-p:text-foreground prose-li:text-foreground `
              )}
            />

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
