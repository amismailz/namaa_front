"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type BurgerProps = {
  open: boolean
  onClick: () => void
  className?: string
}

const BurgerButton = ({ open, onClick, className }: BurgerProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className={cn(
        "relative w-7 h-7 cursor-pointer flex flex-col justify-center items-center",
        className
      )}
    >
      {/* Line 1 */}
      <motion.span
        className="absolute h-0.5 w-6 bg-foreground rounded"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.3 }}
      />
      {/* Line 2 */}
      <motion.span
        className="absolute h-0.5 w-6 bg-foreground rounded"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Line 3 */}
      <motion.span
        className="absolute h-0.5 w-6 bg-foreground rounded"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  )
}

export default BurgerButton
