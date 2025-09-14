"use client"

import { usePathname } from "@/i18n/routing"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"

const AnimateRoutes = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // 👈 triggers animation on route change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimateRoutes
