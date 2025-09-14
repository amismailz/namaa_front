"use server"

import { apiFetch } from "@/lib/apiFetcher"
import type { ContactInfoResponse, SeoItemType, SeoType } from "@/types.type"
import { getLocale } from "next-intl/server"

const BASE_API = process.env.API_URL!

export async function getSeo() {
  const response = await apiFetch<SeoType>("/seo", { cache: "no-store" })
  return response.msg_data
}

export async function getSeoBySlug(slug: string) {
  const locale = await getLocale()
  const response = await fetch(`${BASE_API}/seo/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale
    },
    cache: "no-store"
  })

  if (!response.ok) return {}

  const result: SeoItemType = await response.json()
  const data = result.msg_data

  return data
    ? {
        title: data?.title,
        description: data?.description
      }
    : {}
}

export async function getContactInfo() {
  const response = await apiFetch<ContactInfoResponse>(`/contact-info`, {
    next: { revalidate: 3600 }
  })

  return response.msg_data
}
