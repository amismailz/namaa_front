import React from "react"
import { getSlugDetails } from "@/data-layer/common"
import PostDetails from "@/components/PostDetails"
import ServiceDetails from "@/components/ServiceDetails"
import BlogPostHideLocale from "@/components/BlogPostHideLocale"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

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
        title: post.meta_title ?? "Blog title",
        description: post.meta_description ?? "blog description",
        images: [
           {
            url: post.image,
            secureUrl: post.image, // og:image:secure_url
            alt: post.title
          },
          {
            url: "/namaa-otg.jpg",
            secureUrl: `${BASE_URL}/namaa-otg.jpg`, // og:image:secure_url
            width: 1200,
            height: 630,
            alt: "social media agency egypt",
            type: "image/png"
          }
        ],
        url: url // <-- override og:url here
      },
      twitter: {
        title: post.meta_title ?? "Blog title",
        description: post.meta_description ?? "blog description",
        card: "summary_large_image",
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
      title: service.meta_title ?? "Service title",
      description: service.meta_description ?? "Service description",
      alternates: {
        canonical: url,
        languages: {
          en: `${BASE_URL}/en/${service.slug}`,
          ar: `${BASE_URL}/${service.slug}`,
          "x-default": `${BASE_URL}/${service.slug}`
        }
      },
      openGraph: {
        title: service.meta_title ?? "Service title",
        description: service.meta_description ?? "Service description",
        url: url // <-- override og:url here
      },
      twitter: {
        title: service.meta_title ?? "Service title",
        description: service.meta_description ?? "Service description",
        card: "summary_large_image",
        site: url // <-- override og:url here
      }
    }
  }
}

export default async function DynamicSlug({ params }: Props) {
  const [{ locale, dynamicSlug }, t] = await Promise.all([params, getTranslations()])
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
            t={t}
          />
        )

      case "service":
        return (
          <ServiceDetails
            data={data.service}
            currentLocale={locale}
            baseUrl={BASE_URL}
            t={t}
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
