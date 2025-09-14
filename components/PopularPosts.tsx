import { BlogItemType } from "@/types.type"
import React from "react"
import BlogItem from "@/components/BlogItem"

const PopularPosts = ({ data }: { data: BlogItemType[] }) => {
  return (
    <div className="space-y-5">
      {data.map((item) => (
        <BlogItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default PopularPosts
