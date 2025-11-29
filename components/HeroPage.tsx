"use client"

import React from "react"
import Section from "@/components/Section"
import { cn } from "@/lib/utils"
import AnimatedLetters from "@/components/AnimatedLetters"
import Container from "@/components/Container"
import { Link } from "@/i18n/routing"
// import { motion, Variants } from "framer-motion"

// ✨ Corner animation
// const cornerVariants: Variants = {
//   hidden: { opacity: 0, scale: 0.5, y: -5 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       // delay: i * 0.15,
//       duration: 0.4,
//       ease: "easeOut"
//     }
//   }
// }

type BreadCrumbItem = {
  text: string | React.ReactNode
  link?: string
}

interface HeroPageProps {
  heading: string | React.ReactNode
  description?: string | React.ReactNode
  className?: string
  breadcrumb?: BreadCrumbItem[]
}

// ♻️ Extracted Corners into reusable component
const HeroCorners = () => {
  const positions = [
    "-top-2 -left-2",
    "-top-2 -right-2",
    "-bottom-2 -left-2",
    "-bottom-2 -right-2"
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={pos}
          // custom={i}
          // initial="hidden"
          // animate="show"
          // variants={cornerVariants}
          className={cn(
            "absolute w-3 h-3 border border-primary/50 rounded",
            pos
          )}
        />
      ))}
    </>
  )
}

const HeroPage = ({
  className,
  heading,
  description,
  breadcrumb
}: HeroPageProps) => {
  return (
    <Section className={cn("py-12 lg:py-20 bg-hero-background", className)}>
      <Container>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl lg:text-7xl font-semibold">
            <span className="inline-block text-primary p-1 border border-primary/50 rounded-lg relative">
              <AnimatedLetters text={heading} />
              <HeroCorners />
            </span>
          </h1>

          {description && (
            <p className="text-sm lg:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="mt-2 lg:mt-6">
            <ol
              className={cn(
                "flex items-center text-sm text-muted-foreground",
                "[&>li+li]:before:content-['/']",
                "[&>li+li]:before:px-2",
                "[&>li+li]:before:text-muted-foreground",
                "[&_li]:text-xl lg:[&_li]:text-2xl [&_li]:capitalize"
              )}
            >
              {breadcrumb.map(({ text, link }, index) => {
                return link ? (
                  <li key={`${text}_${index}`}>
                    <Link
                      href={link}
                      className="hover:text-primary text-foreground"
                    >
                      {text}
                    </Link>
                  </li>
                ) : (
                  <li
                    key={`${text}_${index}`}
                    className="text-muted-foreground font-medium"
                    aria-current={!link ? "page" : undefined}
                  >
                    {text}
                  </li>
                )
              })}
            </ol>
          </nav>
        ) : null}
      </Container>
    </Section>
  )
}

export default HeroPage
