"use client"

import { usePathname, Link } from "@/i18n/routing"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LOCALES } from "@/constants"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"

const LOCALE_LABELS: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "/locales/en.svg" },
  ar: { label: "العربية", flag: "/locales/ar.png" }
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  // determine target locale (toggle for now, but can scale later)
  const targetLocale = locale === LOCALES.EN ? LOCALES.AR : LOCALES.EN
  const { label, flag } = LOCALE_LABELS[targetLocale]

  // This is the 🔑 part: translate pathname into the target locale
  // const targetPath = getPathname({ locale: targetLocale, pathname })

  return (
    <div className="" id="switcher-control">
    <Button
      asChild
      variant="link"
      className={cn(
        "flex items-center gap-2 font-semibold text-muted-foreground cursor-pointer"
      )}
    >
      <Link
        href={pathname}
        locale={targetLocale}
        className="flex items-center gap-1 ltr:font-mono"
      >
        <span>{label}</span>
        <Image
          src={flag}
          width={21}
          height={15}
          alt={`${targetLocale} language icon`}
        />
      </Link>
    </Button>
    </div>
  )
}
