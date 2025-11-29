"use client"

import React, { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { useLocale } from "next-intl";

const AnimatedLetters = ({ text }: { text: string | React.ReactNode }) => {

  const locale = useLocale()
  const isArabic = locale === "ar"

  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    // This code ONLY runs on the client after successful hydration.
    // Therefore, if it runs, JavaScript is enabled.
    setIsJSEnabled(true);
  }, []);



  const variants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  if (!isJSEnabled) {
    return (
      <span className={isArabic ? "relative lg:-top-2" : ""}>
        <span className="inline-block relative">{text}</span>
      </span>
    )
  }

  return (
    <span className={isArabic ? "relative lg:-top-2" : ""}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        className="inline-block relative"
      >
        {text}

        {/* corner dots */}
        <span className="absolute -top-2 -left-2 w-3 h-3 border border-primary/50 rounded animate-ping" />
        <span className="absolute -top-2 -right-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.3s]" />
        <span className="absolute -bottom-2 -left-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.6s]" />
        <span className="absolute -bottom-2 -right-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.9s]" />
      </motion.span>
    </span>
  )
}

export default AnimatedLetters
