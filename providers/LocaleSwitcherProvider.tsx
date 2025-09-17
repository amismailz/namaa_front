"use client"

import { createContext, useContext, ReactNode, useState } from "react"

type LocaleSwitcherContextType = {
  hidden: boolean
  hide: () => void
  show: () => void
}

const LocaleSwitcherContext = createContext<
  LocaleSwitcherContextType | undefined
>(undefined)

export function LocaleSwitcherProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false)

  return (
    <LocaleSwitcherContext.Provider
      value={{
        hidden,
        hide: () => setHidden(true),
        show: () => setHidden(false)
      }}
    >
      {children}
    </LocaleSwitcherContext.Provider>
  )
}

export function useLocaleSwitcher(): LocaleSwitcherContextType {
  const ctx = useContext(LocaleSwitcherContext)
  if (!ctx) {
    throw new Error(
      "useLocaleSwitcher must be used inside LocaleSwitcherProvider"
    )
  }
  return ctx
}
