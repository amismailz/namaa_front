import { apiFetch } from "@/lib/apiFetcher"
import { FaqReponse } from "@/types.type"

export async function getFaqList() {
  const response = await apiFetch<FaqReponse>("/faqs", {
    next: { revalidate: 180 }
  })

  return response.msg_data[0]
}
