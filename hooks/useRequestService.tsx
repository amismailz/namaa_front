import { RequestFormType } from "@/components/ServiceRequestForm"
import { useMutation } from "@tanstack/react-query"

async function fetcher(data: RequestFormType) {
  const res = await fetch("/api/request-service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export default function useRequestService() {
  return useMutation({
    mutationFn: fetcher
  })
}
