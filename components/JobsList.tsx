"use client"

import { JobType } from "@/types.type"
import React from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import ApplyJobDialog from "@/components/ApplyJobDialog"

const JobsList = ({ data }: { data: JobType[] }) => {
  return data.map((item, index) => {
    const isEven = index % 2 === 0
    return (
      <Section key={item.id} className={cn("py-10", !isEven && "bg-[#F9F9F9]")}>
        <Container className="grid grid-cols-1 justify-center lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <figure
            className={cn(
              "w-full h-full aspect-video relative p-6 mx-auto flex justify-center items-center",
              !isEven && "lg:order-2"
            )}
          >
            <Image
              src={item.image}
              alt="job image"
              fill
              className={cn(
                "object-fill bounce-animation max-w-[80%] mx-auto w-auto rounded-t-full h-full",
                !isEven ? "rounded-l-full" : "rounded-r-full"
              )}
            />
          </figure>
          <div
            className={cn(
              "space-y-7 p-6 ",
              !isEven && "lg:order-1 ltr:text-right rtl:text-left"
            )}
          >
            <header className="flex flex-col gap-2">
              <h3 className="text-3xl font-medium text-primary">
                {item.title}
              </h3>
              <span className="text-sm text-muted-foreground font-light">
                {/* {item.created_at} */}
                {format(new Date(item.created_at), "MM/dd/yyyy")}
              </span>
            </header>

            <div
              dangerouslySetInnerHTML={{ __html: item.description }}
              className={cn(
                `prose lg:prose-lg max-w-full prose-a:text-green-600 prose-a:hover:text-green-700 prose-a:underline prose-a:font-medium prose-headings:text-primary prose-img:rounded-xl prose-img:max-w-full prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5-text-lg prose-h5:font-bold prose-p:text-foreground prose-li:text-foreground prose-base`
              )}
            />

            <div className="">
              <ApplyJobDialog jobTitle={item.title} jobSlug={item.slug} />
            </div>
          </div>
        </Container>
      </Section>
    )
  })
}

export default JobsList
