"use client"

import { motion } from "framer-motion"
import React from "react"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import Container from "@/components/Container"
import Section from "@/components/Section"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"
import { WebsiteDesignHome } from "@/types.type"
import RenderHtml from "@/components/RenderHtml"

const DevelopmentSection = ({
  className,
  data
}: {
  className?: string
  data: WebsiteDesignHome
}) => {
  return (
    <Section className={cn("", className)}>
      <Container className="lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-6">
        <motion.div
          className="space-y-7 py-16 relative z-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }} // 👈 animate each time it's in view
        >
          <div>
            <p className="text-muted-foreground">
              <Translate id="home.development_section.tagline" />
            </p>
            <h3 className="scroll-m-20 mt-1 text-3xl lg:text-4xl text-primary font-semibold">
              {data.title}
            </h3>
          </div>

          <RenderHtml html={data.description} />

          <div className="flex items-center gap-6">
            <AnimatedPageLink href="/contact-us">
              <ButtonWithIcon
                asChild
                icon={<GoArrowUpRight className="text-foreground" />}
                iconClass="bg-background"
              >
                <span>
                  <Translate id="actions.send_message" />
                </span>
              </ButtonWithIcon>
            </AnimatedPageLink>
          </div>
        </motion.div>
      </Container>

      {/* shape */}
      <div className="absolute rtl:left-0 ltr:right-0 top-0 w-full h-full overflow-hidden">
        <div
          className="w-full h-full absolute top-0 ltr:right-0 rtl:left-0 block"
          style={{
            backgroundImage: `url(/shap_44.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        />
      </div>

      <div className=" opacity-10 lg:opacity-100">
        <motion.div
          className="w-full bounce-animation max-w-full lg:max-w-[560px] h-full absolute lg:ltr:right-10 lg:rtl:left-10 ltr:right-0 rtl:left-0 bottom-0"
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }} // 👈 same here
        />
      </div>
    </Section>
  )
}

export default DevelopmentSection
