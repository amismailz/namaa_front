"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import BurgerButton from "@/components/header/BurgerButton"
import MainLogo from "@/components/header/MainLogo"
import { useLocale, useTranslations } from "next-intl"
import { navigation } from "@/lib/data"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import { usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

type Props = {
  className?: string
  children?: React.ReactNode
}

const NavToggler = ({ className, children }: Props) => {
  const pathname = usePathname()
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"
  const [open, setOpen] = useState(false)

  // recursive renderer
  const renderNav = (items: typeof navigation, level = 0) => {
    return items.map(({ label, href, children }, index) => {
      const isActive = href === pathname

      return (
        <div key={index} className="w-full">
          <AnimatedPageLink
            label={`. ${t(label)}`}
            onClicked={() => setOpen(false)}
            href={href}
            className={cn(
              "block py-2 px-6 truncate transition-colors",
              isActive
                ? "text-background bg-primary font-semibold"
                : level === 0
                ? "text-foreground font-semibold"
                : "text-foreground font-light",
              level > 0 && `pl-${level * 6}` // indent children
            )}
          />

          {children && children.length > 0 && (
            <div className="flex flex-col ltr:ml-3">
              {renderNav(children, level + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <BurgerButton
          open={open}
          onClick={() => setOpen(!open)}
          className="md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "right" : "left"}
        className="w-[80%] border-0 h-screen flex flex-col gap-0 divide-y divide-black/10"
      >
        <SheetHeader className="w-full flex-none p-6">
          <SheetTitle>
            <MainLogo className="shrink-0 py-1" />
          </SheetTitle>
          <SheetDescription>
            Digital Marketing for your business
          </SheetDescription>
        </SheetHeader>

        <div className="content flex-auto overflow-hidden">
          <ScrollArea className="h-full">
            <nav className="">
              {/* {navigation.map(({ label, href }, index) => {
                const isActive = href === pathname
                return (
                  <AnimatedPageLink
                    key={index}
                    label={t(`${label}`)}
                    onClicked={() => setOpen(false)}
                    href={href}
                    className={cn(
                      "py-3 px-6 whitespace-nowrap truncate flex font-semibold",
                      isActive
                        ? "text-background bg-primary "
                        : "text-foreground"
                    )}
                  />
                )
              })} */}

              {renderNav(navigation)}
            </nav>
          </ScrollArea>
        </div>

        <footer className="flex-none p-6">{children}</footer>
      </SheetContent>
    </Sheet>
  )
}

export default NavToggler
