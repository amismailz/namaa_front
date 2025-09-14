"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"

const AnimatedLetters = ({ text }: { text: string | React.ReactNode }) => {
  // const letters = text.split("")

  // const container = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.03
  //     } // delay per letter
  //   }
  // }

  // const letter = {
  //   hidden: { opacity: 0, y: 14 },
  //   visible: { opacity: 1, y: 0 }
  // }

  const variants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.span
      // variants={container}
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true }}

      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      className="inline-block relative"
    >
      {text}
      {/* {letters
        .join("") // turn array back into string
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize each word's first letter
        .split("") // split again into characters
        .map((char, i) => (
          <motion.span key={i} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))} */}

      {/* corner dots */}
      <span className="absolute -top-2 -left-2 w-3 h-3 border border-primary/50 rounded animate-ping" />
      <span className="absolute -top-2 -right-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.3s]" />
      <span className="absolute -bottom-2 -left-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.6s]" />
      <span className="absolute -bottom-2 -right-2 w-3 h-3 border border-primary/50 rounded animate-ping [animation-delay:0.9s]" />
    </motion.span>
  )
}

export default AnimatedLetters
