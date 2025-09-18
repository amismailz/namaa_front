"use server"

import { apiFetch } from "@/lib/apiFetcher"
import { HomeResponseType } from "@/types.type"

export async function getHome() {
  const response = await apiFetch<HomeResponseType>("/home")
  console.log({response})
  return response?.msg_data
}
