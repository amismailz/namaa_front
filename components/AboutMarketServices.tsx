"use client"
import React from "react"
import { motion, Variants } from "framer-motion"
import Container from "@/components/Container"
import Section from "@/components/Section"
import Image from "next/image"
import TitleLine from "@/components/TitleLine"
import Translate from "@/components/Translate"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const AboutMarketServices = () => {

  return (
    <Section className="py-16 bg-[#F8F8F8]">
      <Container className="flex flex-col gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-primary">
            <Translate id="about_us.about_marketing.tagline" />
          </p>
          <TitleLine
            heading={<Translate id="about_us.about_marketing.title" />}
            titleClass="text-2xl text-foreground"
            className="inline-block text-foreground mt-1 mb-0"
          />
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Left image */}
          <motion.figure variants={fadeUp}>
            <Image
              src="/about-graph.svg"
              alt="about us"
              width={813}
              height={527}
              className="max-w-[88%] h-auto object-cover"
            />
          </motion.figure>

          <motion.div variants={staggerParent} className="">
            <motion.ul
              variants={staggerParent}
              className="ltr:[&_li]:pl-7 rtl:[&_li]:pr-7 [&_li]:font-light flex flex-col gap-4 [&_li]:relative [&_li]:before:w-1 [&_li]:before:h-1 [&_li]:before:rounded-full [&_li]:before:bg-black [&_li]:before:absolute [&_li]:before:top-1/2 ltr:[&_li]:before:left-0 rtl:[&_li]:before:right-0 [&_li]:before:-translate-y-1/2"
            >
              {[
                "about_us.about_marketing.listing.item1",
                "about_us.about_marketing.listing.item2",
                "about_us.about_marketing.listing.item3",
                "about_us.about_marketing.listing.item4",
                "about_us.about_marketing.listing.item5",
                "about_us.about_marketing.listing.item6",
                "about_us.about_marketing.listing.item7",
                "about_us.about_marketing.listing.item8",
                "about_us.about_marketing.listing.item9"
              ].map((text, i) => (
                <motion.li key={i} variants={fadeUp}>
                  <Translate id={text} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default AboutMarketServices
