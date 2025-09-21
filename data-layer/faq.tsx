import { apiFetch } from "@/lib/apiFetcher"
import { FaqReponse } from "@/types.type"

export async function getFaqList() {
  const response = await apiFetch<FaqReponse>("/faqs")

  return response.msg_data[0]
}
