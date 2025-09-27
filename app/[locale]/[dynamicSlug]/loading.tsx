"use client"

import Container from "@/components/Container"
import Section from "@/components/Section"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const LoadingBlogSlug = () => {
  const heights = ["h-10", "h-16", "h-12", "h-8", "h-9"]
  const widths = ["w-[70%]", "w-[75%]", "w-[98%]", "w-[80%]", "w-[90%]"]

  return (
    <>
      <Section className="py-20 bg-hero-background">
        <Container>
          <Skeleton className="h-12 w-[70%] bg-[#e0e0e0] rounded-xl" />

          <nav aria-label="Breadcrumb" className="mt-6">
            <div className="flex gap-2 items-center text-sm text-muted-foreground">
              <Skeleton className="w-16 h-7 bg-[#e0e0e0] rounded-xl" />
              <div className="">/</div>
              <Skeleton className="w-16 h-7 bg-[#e0e0e0] rounded-xl" />
            </div>
          </nav>
        </Container>
      </Section>

      <Section className="py-6">
        <Container className="max-w-6xl mx-auto">
          <article className="w-full space-y-6">
            <div className="space-y-6">
              {Array.from({ length: 12 }).map((_, idx) => {
                const randomW =
                  widths[Math.floor(Math.random() * widths.length)]
                const randomH =
                  heights[Math.floor(Math.random() * heights.length)]

                return (
                  <div key={idx} className="space-7-6">
                    <Skeleton className={`${randomW} ${randomH} rounded-xl`} />
                  </div>
                )
              })}
            </div>
          </article>
        </Container>
      </Section>
    </>
  )
}

export default LoadingBlogSlug
