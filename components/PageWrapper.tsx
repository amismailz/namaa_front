"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"

// const PageWrapper = (props: HTMLMotionProps<"div">) => {
//   return (
//     <div className="page-wrapper min-h-screen ">
//       <motion.div
//         {...props}
//         initial={{ opacity: 0.3 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       />
//     </div>
//   )
// }

const PageWrapper = ({children}: {children:React.ReactNode}) => {
  return (
    <div className="page-wrapper min-h-screen ">
     {children}
    </div>
  )
}

export default PageWrapper
