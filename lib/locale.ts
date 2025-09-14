"use server"

import { cookies } from "next/headers"
import {routing} from "@/i18n/routing"

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE"

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || routing.defaultLocale
}

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}

export async function getLocaleDirection(): Promise<"rtl" | "ltr"> {
  const cookieStore = await cookies()
  const locale = cookieStore.get(COOKIE_NAME)?.value || routing.defaultLocale
  return locale === "ar" ? "rtl" : "ltr"
}
