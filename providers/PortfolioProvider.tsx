"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"
import { ProtfolioType, PaginationType } from "@/types.type"
import { getPortofilioList } from "@/data-layer/portofilio"

type PortfolioContextType = {
  items: ProtfolioType[]
  pagination: PaginationType | null
  serviceSlug: string
  isLoading: boolean
  loadMore: () => Promise<void>
  setFilter: (serviceSlug: string) => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({
  children,
  initialData,
  initialPagination,
  initialServiceSlug
}: {
  children: ReactNode
  initialData: ProtfolioType[]
  initialPagination: PaginationType
  initialServiceSlug: string
}) {
  const [items, setItems] = useState(initialData)
  const [pagination, setPagination] = useState(initialPagination)
  const [serviceSlug, setServiceSlug] = useState(initialServiceSlug)
  const [isLoading, setIsLoading] = useState(false)

  // ✅ reset only when slug changes
  useEffect(() => {
    setItems(initialData)
    setPagination(initialPagination)
    setServiceSlug(initialServiceSlug)
  }, [initialServiceSlug])

  const loadMore = async () => {
    if (!pagination || pagination.current_page >= pagination.last_page) return
    setIsLoading(true)
    try {
      const { list, pagination: newPagination } = await getPortofilioList({
        page: (pagination.current_page + 1).toString(),
        service_slug: serviceSlug
      })
      setItems((prev) => [...prev, ...list])
      setPagination(newPagination)
    } finally {
      setIsLoading(false)
    }
  }

  const setFilter = (slug: string) => {
    setServiceSlug(slug)
  }

  return (
    <PortfolioContext.Provider
      value={{ items, pagination, serviceSlug, isLoading, loadMore, setFilter }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error("usePortfolio must be inside PortfolioProvider")
  return ctx
}
