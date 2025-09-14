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
      {/* <Link href="/" className="border-b py-1 inline-block">
        <span className="">Ensign Agency</span>
      </Link>{" "}
      {year} © All rights reserved. */}
    </div>
  )
}

export default CopyRight
