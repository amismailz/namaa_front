import { cn } from "@/lib/utils"
import React from "react"
import { BsInstagram, BsTwitterX, BsTiktok } from "react-icons/bs"
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaSnapchat } from "react-icons/fa"

type Props = {
  instegram?: string
  facebook?: string
  twitter?: string
  tiktok?: string
  linkedin?: string
  snapchat?: string 
  youtube?: string
  className?: string
}

const isValidUrl = (url?: string): url is string =>
  typeof url === "string" && /^https?:\/\//i.test(url)

const SocialInfo = ({
  instegram,
  facebook,
  twitter,
  tiktok,
  linkedin,
  snapchat,
  youtube,
  className
}: Props) => {
  const links = [
    {
      href: instegram,
      icon: <BsInstagram className="text-gray-2" />,
      label: "Instagram"
    },
    {
      href: twitter,
      icon: <BsTwitterX className="text-gray-2" />,
      label: "Twitter"
    },
    {
      href: facebook,
      icon: <FaFacebookF className="text-gray-2" />,
      label: "Facebook"
    },
    {
      href: tiktok,
      icon: <BsTiktok className="text-gray-2" />,
      label: "TikTok"
    },
    {
      href: linkedin,
      icon: <FaLinkedinIn className="text-gray-2" />,
      label: "LinkedIn"
    },
    {
      href: snapchat,
      icon: <FaSnapchat className="text-gray-2" />,
      label: "SnapChat"
    },
    {
      href: youtube,
      icon: <FaYoutube className="text-gray-2" />,
      label: "Youtube"
    }
  ]

  return (
    <nav className={cn("", className)}>
      {links
        .filter((link) => isValidUrl(link.href))
        .map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={link.label}
            className="p-3"
          >
            {link.icon}
          </a>
        ))}
    </nav>
  )
}

export default SocialInfo
