import { BlogItemType } from "@/types.type"
import React from "react"
import BlogItem from "@/components/BlogItem"
import { useLocale } from 'next-intl'

const PopularPosts = ({ data }: { data: BlogItemType[] }) => {
  const locale = useLocale()
  return (
    <div className="space-y-5">
      {data.map((item) => (
        <BlogItem key={item.id} locale={locale} item={item} />
      ))}
    </div>
  )
}

export default PopularPosts
