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

const ServiceDetails = ({
  data,
  currentLocale,
  baseUrl
}: {
  data: ServiceItemType
  currentLocale: "ar" | "en"
  baseUrl: string
}) => {
  return (
    <>
      <HeroPage
        heading={data.title}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` },
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
            <ServiceRequestDialog />
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
