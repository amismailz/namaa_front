"use client"
import React, { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"

const Sticky = ({
  children,
  negativeOffset = "-128px",
  className
}: {
  children: React.ReactNode
  negativeOffset: string
  className?: string
}) => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious()
    if (previous && current > previous && current > 70) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: negativeOffset }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("sticky w-full top-0 z-50", className)}
    >
      {children}
    </motion.div>
  )
}

export default Sticky
