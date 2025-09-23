"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"
import HostingRequestDialog from "@/components/HostingRequestDialog"
import RenderHtml from "@/components/RenderHtml"

type Props = {
  image: {
    height: number
    width: number
    src: string
  }
  title: string
  price: string
  billingCycle: string
  content: string
  isFeatured?: boolean
  packageName: string
  currency: string
}

const HostingPackageBox = ({
  image,
  price,
  title,
  content,
  billingCycle,
  isFeatured = false,
  packageName,
  currency
}: Props) => {
  return (
    <div className="shadow-lg rounded-xl bg-background p-3">
      <div className="border-2 border-dashed rounded-xl p-4 lg:p-6">
        <header className="flex gap-6 items-center">
          <div className="icon w-16 h-16 rounded-xl bg-[#E8E8E8] flex justify-center items-center">
            <motion.span
              animate={{ y: [0, -6, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="h-full w-full mx-auto text-center flex justify-center items-center"
            >
              <Image
                src={image.src}
                alt={`${title} icon`}
                width={image.width}
                height={image.height}
                className="max-w-[80%] h-auto"
              />
            </motion.span>
          </div>
          <h4 className="font-medium text-2xl">{title}</h4>
        </header>

        <div className="flex flex-col items-center justify-center p-10">
          <h5 className="font-bold text-4xl lg:text-6xl text-primary">
            <span className="text-3xl">{currency || "EGP"}</span>
            {price}
          </h5>
          <span className="text-muted-foreground text-base font-light">
            {billingCycle}
          </span>
        </div>

        <div
          className={cn(
            "rounded-xl p-6 flex flex-col gap-6",
            isFeatured
              ? "bg-[#231F20] text-background"
              : "bg-[#E8E8E8] text-foreground"
          )}
        >
          <RenderHtml
            html={content}
            className={`prose-base prose-p:mt-1 prose-p:mb-1 ${
              isFeatured ? "prose-p:text-background" : ""
            }`}
          />
        </div>

        <div className="mt-10">
          <HostingRequestDialog packageName={packageName} title={title} />
        </div>
      </div>
    </div>
  )
}

export default HostingPackageBox
