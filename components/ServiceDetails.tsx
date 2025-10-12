import { ServiceItemType } from "@/types.type"
import React from "react"
import HeroPage from "@/components/HeroPage"
import Translate from "@/components/Translate"
import { ROUTES } from "@/constants"
import Container from "@/components/Container"
import Section from "@/components/Section"
import RenderHtml from "@/components/RenderHtml"
import Image from "next/image"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/JsonLd"
import { TFunction } from "@/i18n/types"
import { BreadcrumbJsonLd } from "./BreadcrumbJsonLd"

const ServiceDetails = ({
  data,
  currentLocale,
  baseUrl,
  t
}: {
  data: ServiceItemType
  currentLocale: "ar" | "en"
  baseUrl: string
  t: TFunction
}) => {

  const url =
    currentLocale === "ar"
      ? `${baseUrl}/${data.slug}`
      : `${baseUrl}/${currentLocale}/${data.slug}`

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    headline: data?.meta_title,
    description: data?.meta_description,
    image: [data.image],
    author: {
      "@type": "Person",
      name: currentLocale === "en" ? "Namaa Agency" : "نماء",
      url: `${baseUrl}`
    },
    publisher: {
      "@type": "Organization",
      name: currentLocale === "en" ? "Namaa Agency" : "نماء",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/NAMAA_LOGO.jpg`
      }
    },
    datePublished: data?.created_at,
    dateModified: data?.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}`
    }
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-${url}`}
        items={[
          { name: t("navbar.home"), url: `${baseUrl}/` },
          { name: data.title, url: `${url}/` }
        ]}
      />

      <JsonLd schema={schemaData} id="service-schema" />

      <HeroPage
        heading={data.title}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/` },
          {
            text: <Translate id="navbar.services" />,
            link: `/${ROUTES.SERVICES}`
          }
        ]}
      />

      <Section className="py-20">
        <Container className="text-center flex flex-col gap-10 justify-center items-center">
          <h3 className="font-medium text-3xl">{data.title}</h3>

          {data?.image ? (
            <div className="flex flex-col justify-center">
              <Image
                src={data.image}
                width={500}
                height={500}
                alt={`${data.title} icon`}
                className="w-[460px] h-auto bounce-animation"
              />
            </div>
          ) : null}

          <RenderHtml html={data.description} className="lg:prose-lg" />
        </Container>
      </Section>

      <Section className="pb-10">
        <Container>
          <div className="flex items-center justify-center gap-3">
            <ServiceRequestDialog
              slug={
                currentLocale === "ar"
                  ? `/${data.slug}`
                  : `/${currentLocale}/${data.slug}`
              }
            />
            <ServiceWhatsAppButton currentUrl={`/${data.slug}`} />
            <Button variant="link" size="icon" asChild>
              <a href="tel:966544175137" target="_blank" rel="follow">
                <Image
                  src="/call-icon.svg"
                  width={36}
                  height={36}
                  alt="call icon"
                />
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default ServiceDetails
