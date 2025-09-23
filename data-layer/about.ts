import { apiFetch } from "@/lib/apiFetcher";
import { AboutUsReponse } from "@/types.type";


export async function getAboutUs() {
   const response = await apiFetch<AboutUsReponse>("/about-us")
   return response.msg_data[0]
}