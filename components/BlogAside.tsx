"use client"

import React from "react"
import BlogSearch from "@/components/BlogSearch"
import PopularPosts from "@/components/PopularPosts"
import { BlogItemType } from "@/types.type"
import { BsInstagram, BsTiktok, BsTwitterX } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"
import Translate from "@/components/Translate"

const BlogAside = ({ popular }: { popular: BlogItemType[] }) => {
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

        <nav className="flex items-center gap-4">
          <a href="" target="_blank" rel="nofollow" className="p-3">
            <BsInstagram className="text-gray-2" />
          </a>
          <a href="" target="_blank" rel="nofollow">
            <BsTwitterX className="text-gray-2" />
          </a>
          <a href="" target="_blank" rel="nofollow" className="p-3">
            <FaFacebookF className="text-gray-2" />
          </a>
          <a href="" target="_blank" rel="nofollow" className="p-3">
            <BsTiktok className="text-gray-2" />
          </a>
        </nav>
      </div>
    </aside>
  )
}

export default BlogAside
