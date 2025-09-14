import { useQuery } from "@tanstack/react-query"

async function fetcher() {
  const res = await fetch("/api/services-labels")
  if (!res.ok) throw new Error("Failed to fetch services labels")
  return await res.json()
}

export default function useGetServicesLabels() {
  return useQuery({
    queryKey: ["services-keys"],
    queryFn: fetcher
  })
}
