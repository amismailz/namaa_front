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
import Translate from "@/components/Translate"
import { ServiceItemType } from "@/types.type"
import RenderHtml from "./RenderHtml"
import { Link } from "@/i18n/routing"

type TabConfig = {
  value: string
  label: string
  icon: string
  bg: string
  labelClass?: string
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
  url,
  image
}: {
  heading: string
  description: string
  showMore?: boolean
  seeMoreLink?: string
  url?: string
  image?: string
}) {
  return (
    <div className="py-2 w-full flex flex-col gap-6 lg:items-center lg:gap-0 lg:grid lg:grid-cols-[1fr_1.5fr]">
      {image ? (
        <div className="flex  flex-col justify-center">
          <h3 className="block lg:hidden mb-6 text-3xl lg:text-4xl font-semibold">
            {heading}
          </h3>
          <Image
            src={image}
            width={500}
            height={500}
            alt={`${heading} icon`}
            className="w-[70%] h-auto bounce-animation"
          />
        </div>
      ) : (
        <div />
      )}
      <div className="space-y-7">
        <h3 className="hidden lg:block mt-3 text-4xl font-semibold">
          {heading}
        </h3>

        <RenderHtml html={description} />

        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-2 lg:gap-4 mt-2">
          <ServiceRequestDialog />

          {showMore && seeMoreLink && (
            <Link href={seeMoreLink}>
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
            </Link>
          )}

          <div className="flex items-center col-span-2 lg:col-span-1 justify-center lg:justify-start mt-5 lg:mt-0 w-full lg:w-auto gap-4">
            {url ? <ServiceWhatsAppButton currentUrl={url} /> : null}

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
          alt={`${label} icon`}
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
        {label}
      </span>
    </TabsTrigger>
  )
})

const ServicesTabs = memo(function ServicesTabs({
  showMore = false,
  data
}: {
  data: ServiceItemType[]
  showMore?: boolean
}) {
  const colors = [
    "bg-[#F0FFFC]",
    "bg-[#F5F5F5]",
    "bg-[#FEEFF4]",
    "bg-[#EDFDFF]"
  ]

  const tabsNew = useMemo(() => {
    return data.map((item) => ({
      value: item.id.toString(),
      bg: colors[Math.floor(Math.random() * colors.length)],
      url: `/${item.slug}`,
      label: item.title,
      description: item.description,
      image: item.image,
      mainImage: item.image,
      icon: item.icon
    }))
  }, [])

  return (
    <Tabs
      defaultValue={tabsNew[0].value}
      className="w-full flex flex-col gap-6"
    >
      {/* Tab Triggers */}
      <TabsList
        className={cn(
          "w-full flex flex-nowrap  bg-transparent h-auto",
          " lg:grid lg:grid-cols-5 lg:gap-4" // desktop: grid
        )}
      >
        {tabsNew.map(({ ...tab }) => (
          <TabTrigger key={tab.value} {...tab} />
        ))}
      </TabsList>

      {/* Tab Content */}
      {tabsNew.map(({ description, image, value, url, label }) => (
        <TabsContent key={value} value={value} className="py-2">
          <TabContent
            heading={label}
            url={url}
            image={image}
            description={description}
            showMore={showMore}
            seeMoreLink={url}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
})

export default ServicesTabs
