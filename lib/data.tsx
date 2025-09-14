import { ROUTES } from "@/constants"

export const navigation = [
  { href: `/${ROUTES.HOME}`, label: "navbar.home" },
  { href: `/${ROUTES.ABOUT_US}`, label: "navbar.about_us" },
  { href: `/${ROUTES.PORTOFILIO}`, label: "navbar.portfilio" },
  {
    href: `/${ROUTES.SERVICES}`,
    label: "navbar.services",
    children: [
      { label: "navbar.ensign_services", href: `/${ROUTES.ENSIGN_SERVICES}` },
      {
        label: "navbar.web_design",
        href: "",
        children: [
          { label: "navbar.website_design", href: `/${ROUTES.WEBSITE_DESIGN}` },
          { label: "navbar.graphic_design", href: `/${ROUTES.GRAPHIC_DESIGN}` },
          { label: "navbar.logo_design", href: `/${ROUTES.LOGO_DESIGN}` }
        ]
      },
      {
        label: "navbar.web_development",
        href: "",
        children: [
          {
            label: "navbar.website_development",
            href: `/${ROUTES.WEBSITE_DEVELOPMENT}`
          },
          { label: "navbar.web_multimedia", href: `/${ROUTES.WEB_MULTIMEDIA}` },
          { label: "navbar.web_host", href: `/${ROUTES.WEB_HOSTING}` }
        ]
      },
      {
        label: "navbar.web_marketing",
        href: "",
        children: [
          {
            label: "navbar.email_marketing",
            href: `/${ROUTES.EMAIL_MARTKETING}`
          },
          { label: "navbar.e_commerce", href: `/${ROUTES.E_COMMERCE}` }
        ]
      },
      {
        label: "navbar.social_media",
        href: `/${ROUTES.SOCIAL_MEDIA}`
      }
    ]
  },
  { href: `/${ROUTES.BLOG}`, label: "navbar.blog" },
  { href: `/${ROUTES.PACKAGES}`, label: "navbar.packages" },
  { href: `/${ROUTES.CONTACT_US}`, label: "navbar.contact_us" },
  { href: `/${ROUTES.JOB}`, label: "navbar.jobs" }
]
