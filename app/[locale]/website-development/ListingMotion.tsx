"use client"

import React from 'react'
import { motion, Variants } from "framer-motion"
import Translate from '@/components/Translate'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const ListingMotion = () => {
  return (
    <motion.div variants={staggerParent} className="">
      <motion.ul
        variants={staggerParent}
        className="ltr:[&_li]:pl-7 rtl:[&_li]:pr-7 [&_li]:font-light flex flex-col gap-4 [&_li]:relative [&_li]:before:w-1 [&_li]:before:h-1 [&_li]:before:rounded-full [&_li]:before:bg-black [&_li]:before:absolute [&_li]:before:top-1/2 ltr:[&_li]:before:left-0 rtl:[&_li]:before:right-0 [&_li]:before:-translate-y-1/2"
      >
        {[
          "website_development.listing.item1",
          "website_development.listing.item2",
          "website_development.listing.item3",
          "website_development.listing.item4"
        ].map((text, i) => (
          <motion.li key={i} variants={fadeUp}>
            <Translate id={text} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

export default ListingMotion
