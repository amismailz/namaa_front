import { ReactNode, ButtonHTMLAttributes } from "react"
import { Slot } from "radix-ui"

// import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative cursor-pointer pr-10! lg:pr-12! h-[46px] group",
  {
    variants: {
      variant: {
        green: "bg-primary-green text-background shadow-xs hover:bg-primary-green/90",
        blue: "bg-primary text-background shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "green",
      size: "default"
    }
  }
)

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children?: ReactNode
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
  variant?: "blue" | "green" | "outline" | "destructive" | "link" | "ghost"
  iconClass?: string
  className?: string
  isDisabled?: boolean
  asChild?: boolean
}

export function ButtonWithIcon({
  asChild = false,
  children,
  icon,
  size,
  variant,
  iconClass,
  className,
  isDisabled = false,
  ...props
}: ButtonWithIconProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      {...props}
      className={cn(buttonVariants({ size, variant }), className)}
    >
      <Slot.Slottable>{children}</Slot.Slottable>

      {icon ? (
        <span
          className={cn(
            "absolute text-lg rounded-full size-7 transition-all duration-200 flex justify-center items-center",
            iconClass,
            isDisabled
              ? "right-1 top-[50%] -translate-y-[50%]"
              : "top-0 right-0 group-hover:right-1 group-hover:top-[50%] group-hover:-translate-y-[50%]"
          )}
        >
          {icon}
        </span>
      ) : null}
    </Comp>
  )
}
