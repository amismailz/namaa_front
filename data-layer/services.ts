import { apiFetch } from "@/lib/apiFetcher"
import { ServicesFormResponse } from "@/types.type"

export async function getServicesRequest() {
  const response = await apiFetch<ServicesFormResponse>(
    "/form/client-request",
    {
      next: { revalidate: 360 }
    }
  )
  return response.msg_data
}
