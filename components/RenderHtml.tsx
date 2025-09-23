import React from "react"
import { cn } from "@/lib/utils"

const RenderHtml = ({
  html,
  className
}: {
  html: string
  className?: string
}) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn(
        `prose lg:prose-lg max-w-full prose-a:text-green-600 prose-a:hover:text-green-700 prose-a:underline prose-a:font-medium prose-headings:text-primary prose-img:rounded-xl prose-img:max-w-full prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5-text-lg prose-h5:font-bold prose-p:text-foreground prose-li:text-foreground `,
        className
      )}
    />
  )
}

export default RenderHtml
