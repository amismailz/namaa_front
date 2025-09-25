// src/i18n/routing.ts
import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"
import { DEFAULT_LOCALE, LOCALES } from "@/constants"
import {localizationPathname} from "@/i18n/localizationPathname"

export const routing = defineRouting({
  locales: [LOCALES.EN, LOCALES.AR],
  defaultLocale: DEFAULT_LOCALE,
  // localePrefix: "always" // 🔑 ensures /en or /ar stays in URL
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: localizationPathname
})

// export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const {
  Link,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
  getPathname
} = createNavigation(routing)
