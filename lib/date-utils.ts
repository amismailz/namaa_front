
import { ar, enUS } from "date-fns/locale"

export function getDateFnsLocale(locale: string) {
  switch (locale) {
    case "ar":
      return ar
    case "en":
    default:
      return enUS
  }
}
