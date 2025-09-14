"use client"

import React from "react"
import { useTranslations } from "next-intl"

type TranslationValues = Record<string, string | number | Date>

type TranslationProps = {
  id: string
  values?: TranslationValues
  components?: Record<string, React.ReactNode>
}

const Translate: React.FC<TranslationProps> = ({
  id,
  values = {},
  components = {}
}) => {
  const t = useTranslations()

  const raw: string = t.raw ? t.raw(id) : t(id, values)

  // Step 2: Replace placeholders {date}, {sitename}, etc.
  let withValues = raw.replace(
    /\{(\w+)\}/g,
    (_, key) => values[key]?.toString() ?? ""
  )

  // Step 3: Split by tags like <link>...</link>
  const parts = withValues.split(/(<\/?[\w]+>)/g)

  let currentTag: string | null = null

  return (
    <>
      {parts.map((part, i) => {
        // Opening tag
        const openMatch = part.match(/^<(\w+)>$/)
        if (openMatch) {
          currentTag = openMatch[1]
          return null
        }

        // Closing tag
        const closeMatch = part.match(/^<\/(\w+)>$/)
        if (closeMatch) {
          currentTag = null
          return null
        }

        // Content inside a tag
        if (currentTag && components[currentTag]) {
          const Tag = components[currentTag]
          return React.cloneElement(Tag as React.ReactElement, { key: i }, part)
        }

        // Plain text
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

export default Translate
