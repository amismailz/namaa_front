
import { ReactElement, ReactNode } from "react"
import { Formats, RichTranslationValues, TranslationValues } from "next-intl"

export interface TFunction {
  (key: string, values?: TranslationValues, formats?: Partial<Formats>): string

  rich(
    key: string,
    values?: RichTranslationValues,
    formats?: Partial<Formats>
  ): string | ReactElement | ReactNode

  raw(key: string): unknown
}
