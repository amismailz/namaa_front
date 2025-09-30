import { ROUTES } from "@/constants"

export type NavItem = {
  label: string
  href: string
  localed: boolean
  key?: string 
  children?: NavItem[]
}

export const navigation = [
  { href: `/`, label: "navbar.home", localed: true },
  { href: `/${ROUTES.ABOUT_US}`, label: "navbar.about_us" , localed: true},
  { href: `/${ROUTES.PORTOFILIO}`, label: "navbar.portfilio", localed: true },
  {
    key: "services",
    href: `/${ROUTES.SERVICES}`,
    label: "navbar.services",
   localed: true
  },
  { href: `/${ROUTES.BLOG}`, label: "navbar.blog", localed: true },
  { href: `/${ROUTES.PACKAGES}`, label: "navbar.packages" , localed: true},
  { href: `/${ROUTES.CONTACT_US}`, label: "navbar.contact_us", localed: true },
  { href: `/${ROUTES.JOB}`, label: "navbar.jobs", localed: true }
]