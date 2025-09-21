import { apiFetch } from "@/lib/apiFetcher"
import { ServicesFormResponse } from "@/types.type"

export async function getServicesRequest() {
  const response = await apiFetch<ServicesFormResponse>(
    "/form/client-request"
  )
  return response.msg_data
}
