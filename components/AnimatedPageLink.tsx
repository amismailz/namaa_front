"use client"

import { useTransitionRouter } from "next-view-transitions"
import React, { ReactNode, useRef } from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing"

type AnimatedPageLinkProps = React.ComponentProps<typeof Link> & {
  isActive?: boolean
  label?: string
  closeDelay?: number
  onClicked?: () => void
  className?: string
  children?: ReactNode
}

const AnimatedPageLink = ({
  href,
  isActive = false,
  label,
  prefetch = false,
  children,
  className,
  closeDelay = 300,
  onClicked,
  ...props
}: AnimatedPageLinkProps) => {
  const router = useTransitionRouter()
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClicked?.()
         setTimeout(() => {
           const fullUrl = ref.current?.href
           if (!fullUrl) return

           // ✅ Convert full absolute URL → relative pathname (locale preserved)
           const relativePath = new URL(fullUrl).pathname

           router.push(relativePath, {
             onTransitionReady: pageAnimation
           })
         }, closeDelay)
      }}
      className={cn("", isActive, className)}
      {...props}
    >
      {children ?? label}
    </Link>
  )
}

const pageAnimation = () => {
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" }
    ],
    {
      duration: 700,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    }
  )

  document.documentElement.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
    {
      duration: 700,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    }
  )
}

export default AnimatedPageLink
