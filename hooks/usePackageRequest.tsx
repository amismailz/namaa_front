import { PackageFormType } from "@/components/PackageRequestForm"
import { useMutation } from "@tanstack/react-query"

async function fetcher(data: PackageFormType) {
  const res = await fetch("/api/request-package", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to send request service")
  }

  return res.json()
}

export default function usePackageRequest() {
  return useMutation({
    mutationFn: fetcher
  })
}
