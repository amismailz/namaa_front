"use server"

import { apiFetch } from "@/lib/apiFetcher"
import type {
  PaginationType,
  PortofilioResponse,
  ProtfolioType
} from "@/types.type"
import { PORTOFILIO_PER_PAGE } from "@/constants"

export type PortfolioResponse = {
  list: ProtfolioType[]
  filters: { label: string; value: string }[]
  pagination: PaginationType
}

export async function getPortofilioList(
  filters: Record<string, string>
): Promise<PortfolioResponse> {
  const response = await apiFetch<PortofilioResponse>("/our-works", {
    cache: "no-store",
    params: { ...filters, per_page: PORTOFILIO_PER_PAGE }
  })

  const filteration = response.msg_data.filters
    ? Object.entries(response.msg_data.filters).map(([value, label]) => ({
        value,
        label
      }))
    : []
  return {
    list: response.msg_data.data,
    filters: filteration,
    pagination: response.pagination
  }
}
