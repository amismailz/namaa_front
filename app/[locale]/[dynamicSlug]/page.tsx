import React from "react"
import { getSlugDetails } from "@/data-layer/common"
import PostDetails from "@/components/PostDetails"
import ServiceDetails from "@/components/ServiceDetails"
import BlogPostHideLocale from "@/components/BlogPostHideLocale"
import { Metadata } from "next"

type Props = {
  params: Promise<{ locale: "ar" | "en"; dynamicSlug: string }>
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata({
  params
}: {
  params: Promise<{ dynamicSlug: string; locale: "ar" | "en" }>
}): Promise<Metadata> {
  const { locale, dynamicSlug } = await params
  const data = await getSlugDetails(dynamicSlug)

  if (data.type === "blog") {
    const post = data.blog

    const url =
      locale === "en"
        ? `${BASE_URL}/${locale}/${post.slug}`
        : `${BASE_URL}/${post.slug}`

    return {
      title: post.meta_title ?? "Blog title",
      description: post.meta_description ?? "blog description",
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
  } else {
    const { service } = data

    const url =
      locale === "en"
        ? `${BASE_URL}/${locale}/${service.slug}`
        : `${BASE_URL}/${service.slug}`

    return {
      title: service.meta_title ?? "Serice title",
      description: service.meta_description ?? "blog description",
      alternates: {
        canonical: url,
        languages: {
          en: `${BASE_URL}/en/${service.slug}`,
          ar: `${BASE_URL}/${service.slug}`,
          "x-default": `${BASE_URL}/${service.slug}`
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
}

export default async function DynamicSlug({ params }: Props) {
  const { locale, dynamicSlug } = await params
  const data = await getSlugDetails(dynamicSlug)

  function renderContent(type: "service" | "blog") {
    switch (type) {
      case "blog":
        return (
          <PostDetails
            post={data.blog}
            popular={data.popular_blogs}
            currentLocale={locale}
            baseUrl={BASE_URL}
          />
        )

      case "service":
        return (
          <ServiceDetails
            data={data.service}
            currentLocale={locale}
            baseUrl={BASE_URL}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <BlogPostHideLocale />
      {renderContent(data.type)}
    </>
  )
}
