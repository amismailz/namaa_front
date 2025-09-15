import React, { cache, Suspense } from "react"
import Container from "@/components/Container"
import Section from "@/components/Section"
import HeroPage from "@/components/HeroPage"
import Image from "next/image"
import { MdMarkEmailRead } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import { BsFillTelephoneInboundFill } from "react-icons/bs"
import { FaMobileAlt } from "react-icons/fa"
import ContactForm from "@/components/ContactForm"
import { Metadata } from "next"
import { getContactInfo, getSeoBySlug } from "@/data-layer/common"
import { ROUTES } from "@/constants"
import { getLocale } from "next-intl/server"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

const cachedLocale = cache(getLocale)

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    cachedLocale(),
    getSeoBySlug("contact-us")
  ])

  const pageKey = `/${ROUTES.CONTACT_US}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url =
    locale === "en"
      ? `${BASE_URL}/en${localizedPaths.en}`
      : `${BASE_URL}${localizedPaths.ar}`

  return {
    ...results,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      ...results,
      url: url // <-- override og:url here
    },
    twitter: {
      ...results,
      card: "summary_large_image",
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default async function ContactUsPage() {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.contact_us" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-12">
        <Container className="grid grid-cols-1 divide-y divide-black/10 lg:divide-none lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="col-span-1 pb-10 lg:pb-0">
            <h3 className="text-2xl font-medium">
              <Translate id="contact_us.title" />
            </h3>
            <p className="text-lg mt-2 font-light">
              <Translate id="contact_us.subtitle" />
            </p>

            <div className="p-6 bg-[F9F9F9] rounded-xl mt-16 border border-black/5 flex items-center gap-7">
              <span>
                <Image
                  alt="icon"
                  src="/increase-sells.svg"
                  height={67}
                  width={64}
                />
              </span>
              <p className="font-light text-lg">
                <Translate id="contact_us.note" />
              </p>
            </div>

            <Suspense fallback={null}>
              <ContactInfo />
            </Suspense>
          </div>
          <div className="col-span-1 ">
            <ContactForm />
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <div className="" style={{ height: "300px" }}>
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
        </Container>
      </Section>
    </>
  )
}

async function ContactInfo() {
  const [locale, data] = await Promise.all([cachedLocale(), getContactInfo()])

  return (
    <ol className="mt-16 flex flex-col gap-7">
      <li className="flex items-center gap-6 lg:gap-7">
        <span className="w-16 lg:w-20 h-16 lg:h-20 flex-none shrink-0 text-background rounded-xl bg-primary flex justify-center items-center">
          <IoLocationOutline size={28} />
        </span>
        <p className="font-medium text-lg">
          <span className="text-muted-foreground font-light text-base">
            <Translate id="navbar.address" />
          </span>
          <br />
          {data.address[locale as "en" | "ar"] || ""}
        </p>
      </li>
      <li className="flex items-center gap-6 lg:gap-7">
        <span className="w-16 lg:w-20 h-16 lg:h-20 flex-none shrink-0 text-background rounded-xl bg-primary flex justify-center items-center">
          <BsFillTelephoneInboundFill size={28} />
        </span>
        <p className="font-medium text-lg">
          <span className="text-muted-foreground font-light text-base">
            <Translate id="navbar.phone" />
          </span>
          <br />
          {data?.landline_1 ? (
            <a href="tel:22561003" target="_blank" rel="nofollow">
              {data?.landline_1}
            </a>
          ) : null}{" "}
          {data?.landline_2 ? (
            <>
              -{" "}
              <a href="tel:22561004" target="_blank" rel="nofollow">
                {data?.landline_2}
              </a>
            </>
          ) : null}
        </p>
      </li>
      <li className="flex items-center gap-6 lg:gap-7">
        <span className="w-16 lg:w-20 h-16 lg:h-20 flex-none shrink-0 text-background rounded-xl bg-primary flex justify-center items-center">
          <FaMobileAlt size={28} />
        </span>
        <p className="font-medium text-lg">
          <span className="text-muted-foreground font-light text-base">
            <Translate id="navbar.cell_phone" />
          </span>
          <br />{" "}
          {data?.phone1 ? (
            <a href={`tel:${data.phone1}`} target="_blank" rel="nofollow">
              {data?.phone1}
            </a>
          ) : null}
          {data?.phone2 ? (
            <>
              -{" "}
              <a href={`tel:${data.phone2}`} target="_blank" rel="nofollow">
                {data?.phone2}
              </a>
            </>
          ) : null}
        </p>
      </li>
      <li className="flex items-center gap-6 lg:gap-7">
        <span className="w-16 lg:w-20 h-16 lg:h-20 flex-none shrink-0 text-background rounded-xl bg-primary flex justify-center items-center">
          <MdMarkEmailRead size={28} />
        </span>
        <p className="font-medium text-lg">
          <span className="text-muted-foreground font-light text-base">
            <Translate id="navbar.email" />
          </span>
          <br />
          {data?.email ? (
            <a href={`mailto:${data.email}`} target="_blank" rel="nofollow">
              {data?.email}
            </a>
          ) : null}
        </p>
      </li>
    </ol>
  )
}
