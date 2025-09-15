"use client"

import Link from "next/link"
import React from "react"
import Translate from "@/components/Translate"
import { ROUTES } from "@/constants"

const CopyRight = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div className="">
      <Translate
        id="footer.copyrights"
        values={{
          dateYear: year.toString(),
          siteName: "Namaa"
        }}
        components={{
          linkTag: (
            <Link href={`/${ROUTES.HOME}`} className=" hover:underline" />
          )
        }}
      />
    </div>
  )
}

export default CopyRight
