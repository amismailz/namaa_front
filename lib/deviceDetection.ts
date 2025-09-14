import isMobile from "is-mobile"

export function getDeviceType(userAgent: string | null): "mobile" | "desktop" {
  if (userAgent && isMobile({ ua: userAgent })) {
    return "mobile"
  }
  return "desktop"
}
