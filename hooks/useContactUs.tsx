import { ContactUsRecords } from "@/components/ContactForm"
import { useMutation } from "@tanstack/react-query"

async function fetcher(data: ContactUsRecords) {
  const res = await fetch("/api/contact-us", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to send message")
  }

  return res.json()
}

export default function useContactUs() {
  return useMutation({
    mutationFn: fetcher
  })
}
