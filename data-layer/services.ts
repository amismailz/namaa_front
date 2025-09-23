import { apiFetch } from "@/lib/apiFetcher"
import { ServicesFormResponse, ServicesReponseType } from "@/types.type"

export async function getServices() {
  const response = await apiFetch<ServicesReponseType>("/services")
  return response.msg_data
}

export async function getServicesRequest() {
  const response = await apiFetch<ServicesFormResponse>(
    "/form/client-request"
  )
  return response.msg_data
}
