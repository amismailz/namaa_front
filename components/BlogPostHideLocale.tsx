"use client"

import { useLocaleSwitcher } from "@/providers/LocaleSwitcherProvider"
import { useEffect } from "react"

const BlogPostHideLocale = () => {
  const { hide, show } = useLocaleSwitcher()

  useEffect(() => {
    hide()
    return () => show()
  }, [])

  return null
}

export default BlogPostHideLocale
