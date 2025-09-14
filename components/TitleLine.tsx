import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

type TitleProps<T extends React.ElementType = "h3"> = {
  className?: string
  titleClass?: string
  heading: string | React.ReactNode
  showLines?: boolean
  as?: T
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, "as"> // Exclude "as" from native props

const TitleLine = <T extends React.ElementType = "h3">({
  heading,
  as,
  className = "",
  showLines = true,
  titleClass,
  children,
  ...props
}: TitleProps<T>) => {
  const Component = as || "h3" // Ensure a valid default tag

  return (
    <div className={cn("mb-5", className)}>
      <Component
        className={cn(
          "scroll-m-20 mb-2 text-primary text-2xl font-semibold",
          titleClass
        )}
        {...props}
      >
        {heading}
      </Component>
      {showLines ? (
        <>
          <span className="w-12 mb-0.5 h-[1px] bg-primary block"></span>
          <span className="w-7 ltr:ml-1 rtl:mr-1 h-[1px] bg-primary block slide-x-animation"></span>
        </>
      ) : null}
    </div>
  )
}

export default TitleLine
