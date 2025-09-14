import { apiFetch } from "@/lib/apiFetcher";
import { JobsResponse } from "@/types.type";


export async function getJobsList() {
   const response = await apiFetch<JobsResponse>("/jobs")
   return response.msg_data
}