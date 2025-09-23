"use client"

import React from "react"
import { motion } from "framer-motion"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import { GoArrowUpRight } from "react-icons/go"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import Image from "next/image"
import Section from "@/components/Section"
import Container from "@/components/Container"
import { ROUTES } from "@/constants"
import Translate from "@/components/Translate"

const ServicesCallToAction = () => {
  return (
    <Section className="py-10">
      <Container className="px-0 md:px-10 lg:px-16 xl:px-20">
        <motion.div
          className="bg-[#777777] relative md:rounded-xl p-8 gap-7 text-background flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }} // 👈 same here
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-[900px] h-[400px] absolute top-0 left-0 block rotate-animation opacity-60"
              style={{
                backgroundImage: `url(/shap_45.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center"
              }}
            />
            <div
              className="w-[900px] h-[400px] absolute top-0 right-0 block rotate-animation opacity-60"
              style={{
                backgroundImage: `url(/shap_44.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center"
              }}
            />
          </div>
          <motion.figure
            className="mx-auto relative z-10"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Image
              src="/logo_on_white.svg"
              alt="Namaa logo"
              width={214}
              height={127}
              className="w-[70%] h-auto mx-auto"
            />
          </motion.figure>

          <div className="space-y-1 text-center relative z-10">
            <p className="text-2xl font-semibold">
              <Translate id="call_to_action2.title" />
            </p>
            <p className="text-xl font-light relative z-10">
              <Translate id="call_to_action2.subtitle" />
            </p>
          </div>

          <AnimatedPageLink href={`/${ROUTES.PORTOFILIO}`}>
            <ButtonWithIcon
              asChild
              variant="outline"
              icon={<GoArrowUpRight className="text-background" />}
              iconClass="bg-primary"
              className="bg-transparent border-primary hover:bg-background"
            >
              <span>
                <Translate id="call_to_action2.action_button" />
              </span>
            </ButtonWithIcon>
          </AnimatedPageLink>
        </motion.div>
      </Container>
    </Section>
  )
}

export default ServicesCallToAction
