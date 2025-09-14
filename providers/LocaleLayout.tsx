import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { getMessages } from "@/lib/locale/getMessages"

type Props = {
  children: React.ReactNode
  // params: Promise<{ locale: string }> 
  locale: string
}

export default async function LocaleLayout({ children, locale }: Props) {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  let messages

  try {
    messages = await getMessages(locale, ["common"])
  } catch {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
