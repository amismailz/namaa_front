import { apiFetch } from "@/lib/apiFetcher"
import { HostingPlansResponse } from "@/types.type"

export async function getHostingPlans() {
  const response = await apiFetch<HostingPlansResponse>("/hosting-plans")

  return response.msg_data
}
