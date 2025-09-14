"use client"

import React, { useTransition } from "react"
import Container from "./Container"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"
import Translate from "@/components/Translate"

const BlogSearchTags = ({ searchKey }: { searchKey: string }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const resetSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    startTransition(() => {
      router.push(`/blog?${params.toString()}`, { scroll: true })
    })
  } 

  return (
    <>
      <Container>
        <div className="text-muted-foreground py-7 flex items-center gap-1">
          <span className="italic">
            <Translate id="blog.searching_for" />:
          </span>{" "}
          <span className="border-b font-medium text-foreground/70">
            {searchKey}
          </span>
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={resetSearch}
          >
            <Translate id="blog.clear_search" />
          </span>
        </div>
      </Container>

      {isPending ? (
        <div className="fixed w-full h-screen top-0 left-0 z-[9999] bg-background/70 flex items-center justify-center">
          <Loader size={48} className="animate-spin text-primary" />
        </div>
      ) : null}
    </>
  )
}

export default BlogSearchTags
