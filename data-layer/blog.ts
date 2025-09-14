"use server"

import { apiFetch } from "@/lib/apiFetcher"
import { BlogItemResponse, BlogResponse } from "@/types.type"

export async function getBlogList(filters: Record<string,string>) {
  const response = await apiFetch<BlogResponse>("/blogs", {
    params: filters
  })
  return { list: response.msg_data, pagination: response.pagination}
}

export async function getBlogBySlug(slug: string) {
  const response = await apiFetch<BlogItemResponse>(`/blogs/${slug}`)
  return {
    post: response.msg_data.blog,
    popular: response.msg_data.popular_blogs
  }
}
