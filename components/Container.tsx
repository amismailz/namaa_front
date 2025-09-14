import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const Container = ({
  children,
  className = ""
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        `mx-auto w-full px-4 md:px-10 lg:px-16 xl:px-20`,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
