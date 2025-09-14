"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function RouteLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!pathname) return

    setLoading(true)

    // Small delay so loader shows during navigation
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 400) // adjust to match your transition

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center"
        >
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
