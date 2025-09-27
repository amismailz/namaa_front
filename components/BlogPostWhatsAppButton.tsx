"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Translate from "@/components/Translate"
import { BsWhatsapp } from "react-icons/bs"

const BlogPostWhatsAppButton = ({
  currentUrl,
  phone
}: {
  currentUrl: string
  phone: string
}) => {
  const message = `Hi, Namaa.\nI'm interested in your services.\n${currentUrl}`
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e && e.preventDefault()
    // open in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      asChild
      className="flex-1 h-[48px] rounded-xl gap-3" 
      onClick={handleClick}
    >
      <a href={whatsappUrl}>
        <BsWhatsapp />
        <span>
          <Translate id="actions.whatsApp" />
        </span>
      </a>
    </Button>
  )
}

export default BlogPostWhatsAppButton
