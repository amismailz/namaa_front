"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

import React from "react"
import Container from "./Container"

const NoResult = ({
  className,
  message = "No Result Found!"
}: {
  className?: string
  message?: string
}) => {
  return (
    <Container>
      <div
        className={cn(
          "p-6 justify-center items-center flex flex-col rounded-xl shadow-md ",
          className
        )}
      >
        <Image
          src="/—Pngtree—no result search icon_6511543.png"
          width={300}
          height={300}
          alt="no result"
          className="object-cover"
        />
        <p className="text-muted-foreground text-lg font-light">{message}</p>
      </div>
    </Container>
  )
}

export default NoResult
