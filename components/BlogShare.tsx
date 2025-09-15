"use client"

import React from "react"
import { BsLinkedin, BsEnvelope, BsTwitterX } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton
} from "next-share"
import { cn } from "@/lib/utils"

const BlogShare = ({
  url,
  shareMessage,
  className
}: {
  url: string
  shareMessage: string
  className?: string 
}) => {
  return (
    <nav className={cn("flex items-center gap-6", className)}>
      <LinkedinShareButton url={url}>
        <BsLinkedin className="text-gray-2 text-xl" />
      </LinkedinShareButton>

      <TwitterShareButton url={url} title={shareMessage}>
        <BsTwitterX className="text-gray-2 text-xl" />
      </TwitterShareButton>

      <FacebookShareButton url={url} quote={shareMessage}>
        <FaFacebookF className="text-gray-2 text-xl" />
      </FacebookShareButton>

      <EmailShareButton url={url} subject={shareMessage} body="body">
        <BsEnvelope className="text-gray-2 text-xl" />
      </EmailShareButton>
    </nav>
  )
}

export default BlogShare
