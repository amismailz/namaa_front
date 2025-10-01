"use server"

import { apiFetch } from "@/lib/apiFetcher"
import type {
  ContactInfoResponse,
  DynamicSlugResponse,
  NavigationResp,
  SeoItemType,
  SeoType
} from "@/types.type"
import { getLocale } from "next-intl/server"
import { cache } from "react"

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

  return data ? data : {}
}

export async function getContactInfo() {
  const response = await apiFetch<ContactInfoResponse>(`/contact-info`)
  return response.msg_data
}

export async function getSlugDetails(slug: string) {
  const response = await apiFetch<DynamicSlugResponse>(`/service-blog/${slug}`)
  return response.msg_data
}

export const getServersNavigation = cache(async () => {
  const res = await apiFetch<NavigationResp>(`/navbar/services`)
  const result = res.msg_data || []
  return result?.map((i) => ({
    label: i.title,
    localed: false,
    href: `/${i.slug}`
  }))
})
