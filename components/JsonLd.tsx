
type JsonLdProps = {
  id: string
  schema: Record<string, any>
}

export function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <script
      id={id || "schema"}
      type="application/ld+json"
      // strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
