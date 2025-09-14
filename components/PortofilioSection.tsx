"use client"

import React, { useState } from "react"
import Section from "@/components/Section"
import TitleLine from "@/components/TitleLine"
import Container from "@/components/Container"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import { ProtfolioType } from "@/types.type"
import { useTranslations } from "next-intl"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion"
import PortofilioLightBox from "@/components/PortofilioLightBox"
import { ROUTES } from "@/constants"
import Translate from "@/components/Translate"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // delay between items
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const PortofilioSection = ({
  list,
  className
}: {
  list: ProtfolioType[]
  className?: string
}) => {
  const t = useTranslations()

  // state
  const [openGallery, setOpenGallery] = useState<{
    isShown: boolean
    index: number
  }>({ isShown: false, index: 0 })

  return (
    <>
      <Section className={cn("", className)}>
        <div className="text-center">
          <p className="text-muted-foreground">
            <Translate id="portfilio.title" />
          </p>
          <TitleLine
            heading={<Translate id="navbar.portfilio" />}
            titleClass="text-4xl"
            className="inline-block mt-1"
          />
        </div>

        <Container className="mt-5 space-y-10">
          <motion.div
            className="columns-2 md:columns-3 lg:columns-4 space-y-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {list?.map((item, idx) => (
              <motion.div
                key={idx}
                className="break-inside-avoid cursor-zoom-in rounded-xl overflow-hidden shadow"
                variants={itemVariants}
                onClick={() => setOpenGallery({ isShown: true, index: idx })}
              >
                <img
                  key={idx}
                  src={item.image}
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mx-auto flex justify-center items-center p-6">
            <AnimatedPageLink href={`/${ROUTES.PORTOFILIO}`}>
              <ButtonWithIcon
                asChild
                icon={<GoArrowUpRight className="text-foreground" />}
                iconClass="bg-background"
              >
                <span className="px-10">{t("actions.more")}</span>
              </ButtonWithIcon>
            </AnimatedPageLink>
          </div>
        </Container>
      </Section>

      {openGallery.isShown && (
        <PortofilioLightBox
          open={openGallery.isShown}
          startIndex={openGallery.index}
          onClose={() => setOpenGallery({ isShown: false, index: 0 })}
          slides={list.map((i) => ({ src: i.image }))}
        />
      )}
    </>
  )
}

export default PortofilioSection
