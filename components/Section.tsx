import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const Section = ({
  className,
  children
}: {
  className?: string
  children?: ReactNode
}) => {
  return <section className={cn(className)}>{children}</section>
}

export default Section
