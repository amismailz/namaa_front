"use client"

import React, { ReactNode } from "react"
import { motion, Variants } from "framer-motion"
import Section from "@/components/Section"
import Container from "@/components/Container"
import Image from "next/image"
import { cn } from "@/lib/utils"
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

  return (
    <Section className={cn("", className)}>
      <Container className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="gap-2 grid grid-cols-[2fr_1fr] order-2 lg:order-1">
          <motion.div
            className="h-[600px] rounded-xl transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage: `url(${data?.images[0]})`,
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
              backgroundImage: `url(${data?.images[1]})`,
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

          <div className="space-y-1">
            <div>
              <p className="text-primary">{data?.title}</p>
            </div>

            {data ? (
              <RenderHtml html={data?.description} className="lg:prose-lg" />
            ) : null}
          </div>

        
          {children ? (
            <div className="flex items-center gap-6">{children}</div>
          ) : null}
        </motion.div>
      </Container>
    </Section>
  )
}

export default AboutSection
