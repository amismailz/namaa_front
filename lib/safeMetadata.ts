import type { Metadata } from "next"

/**
 * Wrap metadata generation in a runtime safety check.
 */
export async function safeMetadata(
  fn: () => Promise<Metadata>
): Promise<Metadata> {
  try {
    return await fn()
  } catch {
    return {}
  }
}
