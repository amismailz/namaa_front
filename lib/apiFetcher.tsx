import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"

const apiUrl = process.env.API_URL!

// ✅ Custom API Error Class for Better Error Handling
export class ApiError extends Error {
  status: number
  responseData: unknown

  constructor(status: number, message: string, responseData?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.responseData = responseData
  }
}

type FetchOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: TBody
  cache?: "force-cache" | "no-store" | undefined
  headers?: Record<string, string>
  next?: Record<string, string | string[] | number>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  timeout?: number // Timeout in milliseconds (default: 30s)
  signal?: AbortSignal // To allow request cancellation
}

export async function apiFetch<TResponse, TBody = unknown>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers,
    next,
    params,
    timeout = 30000, // 30s default timeout
    cache = "no-store"
  }: // cache
  FetchOptions<TBody> = {}
): Promise<TResponse> {
  const locale = await getLocale()

  // Construct query string if params exist
  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = String(value)
          }
          return acc
        }, {} as Record<string, string>)
      ).toString()
    : ""

  const url = `${apiUrl}${endpoint}${queryString}`

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Accept-Language": locale,
    ...headers // Allow overriding or adding custom headers
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method,
      next,
      cache,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({})) // Handle non-JSON errors
      throw new ApiError(response.status, response.statusText, errorResponse)
    }

    const data = (await response.json()) as Promise<TResponse>

    return data
  } catch (error: unknown) {
    clearTimeout(timeoutId)

    if (error instanceof ApiError) {
      if (error.status === 404) {
        notFound()
      } else if (error.status === 401) {
        throw new Error("Unauthorized access.")
      } else {
        throw new Error(`🚨 API Error (${error.status}): ${error.message}`)
      }
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout: the server took too long to respond.")
    }

    throw new Error("Unexpected error occurred during API fetch.")
  }
}
