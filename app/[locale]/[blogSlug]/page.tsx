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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const blogBySlug = cache(getBlogBySlug)

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
  const { post, popular } = await blogBySlug(blogSlug)

  return (
    <>
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
            <figure>
              <Image
                src={post.image}
                width={1147}
                height={1147}
                alt={post.title}
                className="w-full rounded-xl object-cover h-auto"
              />
            </figure>

            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </article>

          <BlogAside popular={popular} />
        </Container>
      </Section>
    </>
  )
}
