"use client"

import Image from "next/image"
import React from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import { GoArrowUpRight } from "react-icons/go"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
// import { motion } from "framer-motion"
import { ROUTES } from "@/constants"
import Translate from "@/components/Translate"
import { Link } from "@/i18n/routing"

const CallToAction = () => {
  return (
    <Section className="py-12">
      <Container className="px-0 md:px-10 lg:px-16 xl:px-20">
        <div
          className="bg-[#777777] relative overflow-hidden md:rounded-xl p-8 gap-7 text-background flex flex-col items-center justify-center"
          // initial={{ opacity: 0, y: 80 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, ease: "easeOut" }}
          // viewport={{ once: false, amount: 0.1 }} // 👈 same here
        >
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
          <figure
            className="mx-auto relative z-10"
            // initial={{ opacity: 0, y: 80 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8, ease: "easeOut" }}
            // viewport={{ once: false, amount: 0.3 }}
          >
            <Image
              src="/logo_on_white.svg"
              alt="Namaa logo"
              width={214}
              height={127}
              className="w-[70%] h-auto mx-auto"
            />
          </figure>
          <div className="space-y-1 text-center relative z-10">
            <p className="text-2xl font-semibold">
              <Translate id="call_to_action1.title" />
            </p>
            <p className="text-xl font-light">
              <Translate id="call_to_action1.subtitle" />
            </p>
          </div>

          <Link href={`/${ROUTES.CONTACT_US}`}>
            <ButtonWithIcon
              asChild
              variant="outline"
              icon={<GoArrowUpRight className="text-background" />}
              iconClass="bg-primary-green"
              className="bg-transparent border-background hover:bg-background"
            >
              <span>
                <Translate id="actions.contact_us" />
              </span>
            </ButtonWithIcon>
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export default CallToAction
