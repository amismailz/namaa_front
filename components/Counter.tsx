"use client"

import React from "react"
import CountUp from "react-countup"
import { useInView } from "@/hooks/useInView"

const Counter = ({
  defaultValue = 0,
  value,
  duration = 2,
  suffix = ""
}: {
  defaultValue?: number
  value: number
  duration?: number
  suffix?: string
}) => {
  const { ref, inView } = useInView(0.3)

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp end={value} duration={duration} suffix={suffix} />
      ) : (
        defaultValue
      )}
    </div>
  )
}

export default Counter
