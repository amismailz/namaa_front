"use client"

import React, { ReactNode, useMemo } from "react"
import { motion, Variants } from "framer-motion"
import Section from "@/components/Section"
import Container from "@/components/Container"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"
import RenderHtml from "@/components/RenderHtml"
import { AboutUsType } from "@/types.type"

const AboutSection = ({ children, className, data }: { data?: AboutUsType ;children?: ReactNode; className?: string }) => {
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  // const boxes = useMemo(
  //   () => [
  //     {
  //       text: "about_us.pragraph1",
  //       icon: (
  //         <Image
  //           src="/digital-campaign.svg"
  //           width={67}
  //           height={64}
  //           alt="digital campaign icon"
  //         />
  //       )
  //     },
  //     {
  //       text: "about_us.pragraph2",
  //       icon: (
  //         <Image
  //           src="/microphone.svg"
  //           width={57}
  //           height={56}
  //           alt="microphone icon"
  //         />
  //       )
  //     }
  //   ],
  //   []
  // )

  return (
    <Section className={cn("", className)}>
      <Container className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-6">

        <div className="gap-2 grid grid-cols-[2fr_1fr] order-2 lg:order-1">
          <motion.div
            className="h-[600px] rounded-xl transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(/photos/1.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          />

          <motion.div
            className="h-[600px] rounded-xl relative"
            style={{
              backgroundImage: `url(/photos/2.jpg)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="absolute top-1/2 z-10 -translate-y-[50%] w-28 h-28 flex justify-center items-center rounded-full bg-background ltr:-left-16 rtl:-right-16 p-6">
              <Image
                src="/logo-icon.svg"
                width={107}
                height={66}
                alt="logo icon Namaa"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Text */}
        <motion.div
          className="space-y-8 order-1 lg:order-2"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* <div>
            <p className="text-primary">
              <Translate id="about_us.tagline" />
            </p>
            <h3 className="scroll-m-20 mt-3 text-4xl font-semibold">
              <Translate id="about_us.title" />
            </h3>
          </div>

          <p className="text-lg font-light leading-8">
            <Translate id="about_us.short_descraption" />
          </p> */}

          {data ? <RenderHtml html={data?.description} className="lg:prose-lg" /> : null}

          {/* <div className="flex flex-col gap-4">
            {boxes.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center p-5 gap-8 bg-gray-background rounded-xl border border-black/5"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                {item.icon}
                <p className="text-md font-light leading-7">
                  <Translate id={item.text} />
                </p>
              </motion.div>
            ))}
          </div> */}

          {children ? (
            <div className="flex items-center gap-6">{children}</div>
          ) : null}
        </motion.div>
      </Container>
    </Section>
  )
}

export default AboutSection
