"use client"

import { useEffect, useRef, useState } from "react"

export function useInView(threshold: number = 0.3) {
   const ref = useRef<HTMLDivElement | null>(null)
   const [inView, setInView] = useState(false)

   useEffect(() => {
     if (!ref.current) return

     const observer = new IntersectionObserver(
       ([entry]) => {
         setInView(entry.isIntersecting)
       },
       { threshold }
     )

     observer.observe(ref.current)

     return () => {
       if (ref.current) observer.unobserve(ref.current)
     }
   }, [threshold])

   return { ref, inView }
}