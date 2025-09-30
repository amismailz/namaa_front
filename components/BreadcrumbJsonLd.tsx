
type Crumb = {
  name: string
  localed?: boolean
  url: string
}

export function BreadcrumbJsonLd({
  items,
  id
}: {
  items: Crumb[]
  id?: string
}) {
  if (!items || items.length === 0) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => {
      return {
        "@type": "ListItem",
        position: idx + 1,
        name: it.name,
        item: it.url
      }
    })
  }

  return (
    <script
      id={id || "breadcrumb-jsonld"}
      type="application/ld+json"
      // strategy="afterInteractive"
      // Danger: stringify must produce valid JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
