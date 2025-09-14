"use client"
import React from "react"
import { motion, Variants } from "framer-motion"
import Container from "@/components/Container"
import BlogItem from "@/components/BlogItem"
import { BlogItemType } from "@/types.type"
import { useLocale } from "next-intl"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // delay between items
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const BlogList = ({ data }: { data: BlogItemType[] }) => {
  const locale = useLocale()

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <BlogItem item={item} locale={locale} />
          </motion.div>
        ))}
      </Container>
    </motion.div>
  )
}

export default BlogList
