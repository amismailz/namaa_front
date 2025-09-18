"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const ServiceWhatsAppButton = ({ currentUrl }: { currentUrl: string }) => {
  const phone = "966544175137" // include country code

  const handleClick = () => {
    // prefer window.location.href when available (client), otherwise fall back to baseUrl + currentUrl
    const pageUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `${baseUrl}${currentUrl ?? ""}`

    const message = `Hi, Namaa.\nI'm interested in your services.\n${pageUrl}`

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`

    // open in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      className="rounded-full"
      variant="link"
      size="icon"
      onClick={handleClick}
    >
      <Image
        src="/whatsapp-svgrepo-com.svg"
        alt="whatsApp icon"
        width={36}
        height={36}
      />
    </Button>
  )
}

export default ServiceWhatsAppButton
