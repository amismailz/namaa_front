import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import Section from "@/components/Section"
import Image from "next/image"
import React from "react"
import BlogAside from "@/components/BlogAside"
// import BlogSearch from "@/components/BlogSearch"
import { ROUTES } from "@/constants"
import Translate from "@/components/Translate"
import { format } from "date-fns"
import FaqList from "@/components/FaqList"
import BlogPostContent from "@/components/BlogPostContent"
import { JsonLd } from "@/components/JsonLd"
import { getDateFnsLocale } from "@/lib/date-utils"
import { BlogItemType } from "@/types.type"

const PostDetails = ({
  post,
  popular,
  currentLocale,
  baseUrl
}: {
  post: BlogItemType
  popular: BlogItemType[]
  currentLocale: "ar" | "en"
  baseUrl: string
}) => {
  const dateFnsLocale = getDateFnsLocale(currentLocale)

  const shareLink =
    currentLocale === "ar"
      ? `${baseUrl}/${post.slug}`
      : `${baseUrl}/${currentLocale}/${post.slug}`

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.short_description,
    image: [post.image],
    author: {
      "@type": "Person",
      name: "Namaa Agency",
      url: `${baseUrl}`
    },
    publisher: {
      "@type": "Organization",
      name: "Namaa Agency",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/NAMAA_LOGO.svg`
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
      

      <JsonLd schema={schemaData} id="blog-post-schema" />

      <HeroPage
        heading={post.title}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
          {
            text: <Translate id="blog.hero_title" />,
            link: `/${ROUTES.BLOG}`
          }
        ]}
      />

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

export default PostDetails
