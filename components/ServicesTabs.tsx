"use client"

import React, { memo, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { GoArrowUpRight } from "react-icons/go"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import ServiceRequestDialog from "@/components/ServiceRequestDialog"
import ServiceWhatsAppButton from "@/components/ServiceWhatsAppButton"
import { Button } from "./ui/button"
import { ROUTES } from "@/constants"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import Translate from "@/components/Translate"

type TabConfig = {
  value: string
  label: string
  icon: string
  bg: string
  alt: string
  labelClass: string
  description: string
  seeMoreLink?: string
  url?: string
  // content: React.ReactNode
}

// 🔹 Reusable Tab Content
function TabContent({
  heading,
  description,
  showMore,
  seeMoreLink,
  url
}: {
  heading: string
  description: string
  showMore?: boolean
  seeMoreLink?: string
  url?: string
}) {
  return (
    <div className="py-2 w-full flex flex-col gap-6 lg:items-center lg:gap-0 lg:grid lg:grid-cols-[1fr_1.5fr]">
      <div className="flex  flex-col justify-center">
        <h3 className="block lg:hidden mb-6 text-3xl lg:text-4xl font-semibold">
          <Translate id={heading} />
        </h3>
        <Image
          src="/media_tab_content.svg"
          width={500}
          height={500}
          alt="media"
          className="w-[70%] h-auto bounce-animation"
        />
      </div>
      <div className="space-y-7">
        <h3 className="hidden lg:block mt-3 text-4xl font-semibold">
          <Translate id={heading} />
        </h3>
        <p className="text-md font-light leading-8">
          <Translate id={description} />
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-2 lg:gap-4 mt-2">
          <ServiceRequestDialog />

          {showMore && seeMoreLink && (
            <AnimatedPageLink href={seeMoreLink}>
              <ButtonWithIcon
                asChild
                className="bg-black hover:bg-black"
                icon={<GoArrowUpRight className="text-foreground" />}
                iconClass="bg-background"
              >
                <span>
                  <Translate id="actions.read_more" />
                </span>
              </ButtonWithIcon>
            </AnimatedPageLink>
          )}

          <div className="flex items-center col-span-2 lg:col-span-1 justify-center lg:justify-start mt-5 lg:mt-0 w-full lg:w-auto gap-4">
            {url ? <ServiceWhatsAppButton currentUrl={url} /> : null}

            <Button variant="link" size="icon" asChild>
              <a href="tel:966544175137" target="_blank" rel="nofollow">
                <Image
                  src="/call-icon.svg"
                  width={36}
                  height={36}
                  alt="call icon"
                />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 🔹 Tab Trigger
const TabTrigger = memo(function TabTrigger({
  value,
  label,
  icon,
  bg,
  alt,
  labelClass
}: Omit<TabConfig, "content">) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "lg:h-full flex-1 p-3 shrink-0 cursor-pointer transition-all duration-200 lg:p-4 rounded-lg flex flex-col items-center gap-2 lg:gap-5 justify-between hover:shadow relative group data-[state=active]:border-primary border-b-2 border-transparent",
        bg,
        // ▼ bottom arrow (only when active)
        "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2",
        "after:w-0 after:h-0 after:border-l-12 after:border-r-12 after:border-t-12",
        "after:border-l-transparent after:border-r-transparent after:border-t-transparent",
        "data-[state=active]:after:border-t-primary"
      )}
    >
      <figure className="py-2 lg:py-4 ">
        <Image
          src={icon}
          alt={alt}
          width={93}
          height={93}
          className="group-hover:scale-105 duration-300"
        />
      </figure>

      {/* Divider */}
      <div className="w-full relative hidden lg:block">
        <span className="w-full h-px bg-primary block" />
        <span className="absolute top-1 left-4 w-5 h-px bg-primary" />
        <span className="absolute top-1 right-8 w-14 h-px bg-primary" />
      </div>

      <span
        className={cn(
          "hidden lg:block text-xl font-medium text-primary",
          labelClass
        )}
      >
        <Translate id={label} />
      </span>
    </TabsTrigger>
  )
})

const ServicesTabs = memo(function ServicesTabs({
  showMore = false,
}: {
  showMore?: boolean
}) {
  const tabs = useMemo<TabConfig[]>(
    () => [
      {
        value: "social",
        url: `/${ROUTES.SOCIAL_MEDIA}`,
        label: "navbar.social_media",
        icon: "/tabs-icons/XMLID_1749_.svg",
        bg: "bg-[#F0FFFC]",
        alt: "social media icon",
        labelClass: "capitalize",
        description: "services.social_short_content",
        seeMoreLink: `/${ROUTES.SOCIAL_MEDIA}`
      },
      {
        value: "seo",
        url: `/${ROUTES.SERVICES}`,
        label: "navbar.seo",
        icon: "/tabs-icons/seo_856378 1.svg",
        bg: "bg-[#F5F5F5]",
        alt: "seo icon",
        labelClass: "uppercase",
        description: "services.seo_short_content"
        // seeMoreLink: "/request"
      },
      {
        value: "design",
        url: `/${ROUTES.GRAPHIC_DESIGN}`,
        label: "navbar.professional_design",
        icon: "/tabs-icons/design_10326057 1.svg",
        bg: "bg-[#F0FFFC]",
        alt: "design icon",
        labelClass: "capitalize",
        description: "services.professional_short_content",
        seeMoreLink: `/${ROUTES.GRAPHIC_DESIGN}`
      },
      {
        value: "html_css",
        url: `/${ROUTES.WEBSITE_DEVELOPMENT}`,
        label: "navbar.html_css",
        icon: "/tabs-icons/programming-languages_17638400 1.svg",
        bg: "bg-[#FEEFF4]",
        alt: "html icon",
        labelClass: "uppercase",
        description: "services.html_css_short_content",
        seeMoreLink: `/${ROUTES.WEBSITE_DEVELOPMENT}`
      },
      {
        value: "website-design",
        url: `/${ROUTES.WEBSITE_DESIGN}`,
        label: "navbar.web_design",
        icon: "/tabs-icons/web_14138721 1.svg",
        bg: "bg-[#EDFDFF]",
        alt: "web icon",
        labelClass: "capitalize",
        description: "services.web_design_short_content",
        seeMoreLink: `/${ROUTES.WEBSITE_DESIGN}`
      }
    ],
    []
  )

  return (
    <Tabs defaultValue="social" className="w-full flex flex-col gap-6">
      {/* Tab Triggers */}
      <TabsList
        className={cn(
          "w-full flex flex-nowrap  bg-transparent h-auto",
          " lg:grid lg:grid-cols-5 lg:gap-4" // desktop: grid
        )}
      >
        {tabs.map(({ ...tab }) => (
          <TabTrigger key={tab.value} {...tab} />
        ))}
      </TabsList>

      {/* Tab Content */}
      {tabs.map(({ description, value, url, label, seeMoreLink }) => (
        <TabsContent key={value} value={value} className="py-2">
          <TabContent
            heading={label}
            url={url}
            description={description}
            showMore={showMore}
            seeMoreLink={seeMoreLink}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
})

export default ServicesTabs
