"use client"

import Container from "@/components/Container"
import CopyRight from "@/components/footer/CopyRight"
import { SlLocationPin } from "react-icons/sl"
import { BsTelephone, BsSignpost } from "react-icons/bs"
import { GoMail } from "react-icons/go"
import TitleLine from "@/components/TitleLine"
import { IoMdPhonePortrait } from "react-icons/io"
import { ContactInfoData } from "@/types.type"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/routing"
import { ROUTES } from "@/constants"
import Translate from "@/components/Translate"
import { useMemo } from "react"

const Footer = ({ data }: { data: ContactInfoData }) => {
  const locale = useLocale()

  const contactItems = useMemo(() => [
    {
      icon: <SlLocationPin className="text-primary size-4" />,
      label: (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            data?.address?.[locale as keyof typeof data.address] || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {data?.address?.[locale as keyof typeof data.address]}
        </a>
      )
    },
    {
      icon: <BsTelephone className="text-primary size-4" />,
      label: (
        <>
          <Translate id="navbar.phone" />
          :&nbsp;
          {data?.landline_1 ? (
            <span dir="ltr" className="hover:underline">
              {data.landline_1}
            </span>
          ) : null}
          &nbsp;/&nbsp;
          {data?.landline_2 ? (
            <span dir="ltr" className="hover:underline">
              {data.landline_2}
            </span>
          ) : null}
          &nbsp;
        </>
      )
    },
    {
      icon: <BsSignpost className="text-primary size-4" />,
      label: (
        <>
          <Translate id="navbar.post_code" />: ${data?.postal_code ?? "-"}
        </>
      )
    },
    {
      icon: <IoMdPhonePortrait className="text-primary size-4" />,
      label: (
        <>
          <Translate id="navbar.tax_id" />: ${data?.tax_id ?? "-"}
        </>
      )
    },
    {
      icon: <IoMdPhonePortrait className="text-primary size-4" />,
      label: (
        <>
          <Translate id="navbar.cell_phone" />
          :&nbsp;
          {data?.phone1 ? (
            <a
              href={`tel:${data.phone1}`}
              target="_blank"
              dir="ltr"
              rel="noopener noreferrer nofollow"
              className="hover:underline"
            >
              {data.phone1}
            </a>
          ) : (
            "-"
          )}
          &nbsp;/&nbsp;
          {data?.phone2 ? (
            <a
              href={`tel:${data.phone2}`}
              target="_blank"
              dir="ltr"
              rel="noopener noreferrer nofollow"
              className="hover:underline"
            >
              {data.phone2}
            </a>
          ) : (
            "-"
          )}
          &nbsp;
        </>
      )
    },
    {
      icon: <GoMail className="text-primary size-4" />,
      label: (
        <>
          <Translate id="navbar.email" />:{" "}
          {data?.email ? (
            <a
              href={`mailto:${data.email}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:underline"
            >
              {data.email}
            </a>
          ) : (
            "-"
          )}
        </>
      )
    }
  ], [])

  const importantLinks = useMemo(() => [
    { label: "navbar.website_design", href: `/${ROUTES.WEBSITE_DESIGN}` },
    { label: "navbar.graphic_design", href: `/${ROUTES.GRAPHIC_DESIGN}` },
    { label: "navbar.email_marketing", href: `/${ROUTES.EMAIL_MARTKETING}` },
    { label: "navbar.logo_design", href: `/${ROUTES.LOGO_DESIGN}` },
    { label: "navbar.e_commerce", href: `/${ROUTES.E_COMMERCE}` },
    { label: "navbar.web_host", href: `/${ROUTES.WEB_HOSTING}` },
    {
      label: "navbar.website_development",
      href: `/${ROUTES.WEBSITE_DEVELOPMENT}`
    },
    { label: "navbar.web_multimedia", href: `/${ROUTES.WEB_MULTIMEDIA}` }
  ], [])

  const legalLinks = useMemo(() => [
    { href: `/${ROUTES.LEGAL}`, label: "navbar.legal_disclaimers" },
    { href: `/${ROUTES.PRIVACY}`, label: "navbar.privacy_policy" },
    { href: `/${ROUTES.TERMS}`, label: "navbar.terms" }
  ], [])

  return (
    <Container className="">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.3fr_0.8fr_1.4fr] ">
        <div className="space-y-7">
          <TitleLine heading={<Translate id="footer.contact" />} />
          <ul className="flex flex-col gap-3">
            {contactItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 font-light">
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-64 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.8945!2d39.9591255!3d21.3245354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c207e0cb085917%3A0xc67f3340249f45fc!2sWadi%20Makkah%20Company!5e0!3m2!1sen!2ssa!4v1697040000000!5m2!1sen!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md shadow-sm"
          />
        </div>

        <div className="pt-5 lg:pt-0">
          <TitleLine heading={<Translate id="footer.important_links" />} />

          <ul className="grid grid-cols-2 gap-2 lg:gap-4 font-light">
            {importantLinks.map((item, idx) => (
              <li key={idx} className="hover:text-primary transition-colors">
                <Link href={item.href}>
                  <Translate id={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="h-[1px] my-10 bg-black/10 w-full" />

      <div className="pb-6 font-light flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
        <CopyRight />
        <nav className="flex items-center gap-6">
          {legalLinks.map((item, idx) => (
            <Link href={item.href} key={idx}>
              <Translate id={item.label} />
            </Link>
          ))}
        </nav>
      </div>
    </Container>
  )
}

export default Footer
