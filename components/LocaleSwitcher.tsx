"use client"

import { usePathname, Link } from "@/i18n/routing"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LOCALES } from "@/constants"
import { useLocale } from "next-intl"

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

  return (
    <Button
      asChild
      variant="link"
      className="flex items-center gap-2 text-foreground cursor-pointer"
    >
      <Link href={pathname} locale={targetLocale}>
        <span>{label}</span>
        <Image src={flag} width={21} height={15} alt={targetLocale} />
      </Link>
    </Button>
  )
}
