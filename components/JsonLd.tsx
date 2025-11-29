import Script from "next/script";
type JsonLdProps = {
  id: string
  schema: Record<string, any>
}

export function JsonLd({ id, schema }: JsonLdProps) {
  const jsonString = JSON.stringify(schema);
  return (
    <Script
      id={id || "schema"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
      strategy="beforeInteractive"
    />
  )
}
