"use client"

import React from "react"
import BlogSearch from "@/components/BlogSearch"
import PopularPosts from "@/components/PopularPosts"
import { BlogItemType } from "@/types.type"
import Translate from "@/components/Translate"
import BlogShare from "./BlogShare"

const BlogAside = ({
  popular,
  shareLink,
  shareMessage
}: {
  popular: BlogItemType[]
  shareLink: string
  shareMessage: string
}) => {
  return (
    <aside className="w-full lg:w-1/3 space-y-6">
      <BlogSearch className="hidden lg:block" />

      <div className="p-4 lg:p-6 bg-[#F7F7F7] rounded-xl">
        <h5 className="font-medium mb-4 text-xl">
          <Translate id="blog.popular_posts" />
        </h5>

        <PopularPosts data={popular} />
      </div>

      <div className="p-4 lg:p-6 bg-[#F7F7F7] rounded-xl">
        <h5 className="font-medium mb-4 text-xl">
          <Translate id="blog.share_post" />
        </h5>

        <div className="p-4 lg:p-6 bg-[#F7F7F7] rounded-xl">
          <h5 className="font-medium text-xl">
            <Translate id="blog.share_post" />
          </h5>

          <BlogShare
            url={shareLink}
            shareMessage={shareMessage}
            className="mt-8"
          />
        </div>
      </div>
    </aside>
  )
}

export default BlogAside
