"use client"

import { DirectionProvider } from "@radix-ui/react-direction"

type DirectionProps = {
  children: React.ReactNode
  direction: "ltr" | "rtl"
}

export function Direction({ children, direction }: DirectionProps) {
  return <DirectionProvider dir={direction}>{children}</DirectionProvider>
}
