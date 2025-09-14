"use client"

import React, { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Translate from "@/components/Translate"

const BlogSearch = ({ className }: { className?: string }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const search = searchParams.get("search")

  const [query, setQuery] = useState(search ?? "")

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`/blog?${params.toString()}`, { scroll: true })
    })
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    setQuery("")
    startTransition(() => {
      router.push(`/blog?${params.toString()}`, { scroll: true })
    })
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className={cn(
          "p-4 relative overflow-hidden lg:p-6 bg-[#F7F7F7] rounded-xl",
          className
        )}
      >
        <Label className="font-medium mb-4">
          <Translate id="blog.search_blog" />
        </Label>
        <Input
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-[54px] ltr:pr-12 focus-visible:outline-0 rtl:pl-12 bg-background border-none ring-0 focus-visible:ring-0 rounded-xl focus:ring-0 focus:outline-0"
        />

        {query ? (
          <button
            onClick={handleClear}
            type="button"
            role="clear search"
            className="border-0 rounded-0 absolute w-12 h-full ltr:right-0 rtl:left-0 top-0 flex justify-center items-center text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200 z-10"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </form>

      {isPending ? (
        <div className="fixed w-full h-screen top-0 left-0 z-[9999] bg-background/70 flex items-center justify-center">
          <Loader size={48} className="animate-spin text-primary" />
        </div>
      ) : null}
    </>
  )
}

export default BlogSearch
