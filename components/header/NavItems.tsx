"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/routing"
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from "react-icons/md"
import type { NavItem } from "@/lib/data"

// declare once (adjust length to max expected submenus)
// const GROUPS = [
//   "group/level-0",
//   "group/level-1",
//   "group/level-2",
//   "group/level-3",
//   "group/level-4"
// ]

// const GROUP_HOVERS = [
//   "group-hover/level-0:block",
//   "group-hover/level-1:block ",
//   "group-hover/level-2:block ",
//   "group-hover/level-3:block ",
//   "group-hover/level-4:block"
// ]

const NavItems = ({
  className,
  navigation
}: {
  className?: string
  navigation: NavItem[]
}) => {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = useLocale()
  const isRtl = locale === "ar"

  const subMenuArrow = isRtl ? (
    <MdKeyboardArrowLeft />
  ) : (
    <MdKeyboardArrowRight />
  )

  return (
    <nav className={cn("flex items-center gap-4", className)}>
      {navigation.map(({ label, href, localed, children }, index) => {
        const isActive = href === pathname
        if (!children) {
          return (
            <Link
              key={index}
              href={href}
              className={cn(
                "py-2 px-4 xl:px-6 font-semibold h-full flex justify-center items-center",
                isActive
                  ? "text-primary bg-hero-background"
                  : "text-foreground hover:bg-hero-background hover:text-primary-green"
              )}
            >
              {localed ? t(label) : label}
            </Link>
          )
        }

        return (
          <div key={index} className="relative h-full group list-none">
            <Link
              href={href}
              className={cn(
                "flex h-full items-center justify-center gap-2 py-2 px-4 xl:px-6 font-semibold",
                isActive
                  ? "text-primary bg-hero-background"
                  : "hover:bg-hero-background hover:text-primary-green"
              )}
            >
              <span>{localed ? t(label) : label}</span>
              <MdKeyboardArrowDown />
            </Link>

            {/* 1st level dropdown */}
            <ul className="absolute left-0 top-full hidden group-hover:block bg-background shadow-lg min-w-52 py-2 z-50">
              {children.map((child, idx) => {
                const active = child.href === pathname

                // if (child.children) {
                //   return (
                //     <li
                //       key={idx}
                //       className={`relative w-full ${GROUPS[idx]} list-none`}
                //     >
                //       <button
                //         className={cn(
                //           "w-full flex items-center justify-between px-4 py-2 text-left",
                //           active
                //             ? "text-primary bg-hero-background"
                //             : "hover:bg-hero-background"
                //         )}
                //       >
                //         <span>{localed ? t(child.label) : label}</span>
                //         {subMenuArrow}
                //       </button>

                //       {/* nested dropdown */}
                //       <div
                //         className={`absolute rtl:right-[100%] ltr:left-[100%] top-0 hidden ${GROUP_HOVERS[idx]} bg-background shadow-lg min-w-52 py-2 z-50`}
                //       >
                //         <ul>
                //           {child.children.map((sub, sidx) => {
                //             const subActive = sub.href === pathname
                //             return (
                //               <li key={sidx} className="list-none">
                //                 <Link
                //                   href={sub.href}
                //                   className={cn(
                //                     "block px-4 py-2 whitespace-nowrap",
                //                     subActive
                //                       ? "text-primary bg-hero-background"
                //                       : "hover:bg-hero-background hover:text-primary-green"
                //                   )}
                //                 >
                //                   {localed ? t(sub.label) : sub.label}
                //                 </Link>
                //               </li>
                //             )
                //           })}
                //         </ul>
                //       </div>
                //     </li>
                //   )
                // }

                return (
                  <li key={idx} className="list-none">
                    <Link
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 whitespace-nowrap",
                        active
                          ? "text-primary bg-hero-background"
                          : "hover:bg-hero-background hover:text-primary-green"
                      )}
                    >
                      {child.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export default NavItems
