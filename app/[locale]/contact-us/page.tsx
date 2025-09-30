import React, { Suspense } from "react"
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
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { JsonLd } from "@/components/JsonLd"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getTranslations } from "next-intl/server"
import { TFunction } from "@/i18n/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
const placeId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID!

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
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
      ? `${BASE_URL}/${locale}${localizedPaths.en}`
      : `${BASE_URL}${localizedPaths.ar}`

  return {
    ...results,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
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

export default async function ContactUsPage({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const [{ locale }, t] = await Promise.all([params, getTranslations()])
  const zoom = 18

  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.contact_us" />}
        breadcrumb={[{ text: <Translate id="navbar.home" />, link: `/` }]}
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
                  alt="increase sells icon"
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
              <ContactInfo locale={locale} t={t} />
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
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&zoom=${zoom}&language=${locale}`}
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

async function ContactInfo({
  locale,
  t
}: {
  locale: "ar" | "en"
  t: TFunction
}) {
  const data = await getContactInfo()

  const isAr = locale === "ar"

  const pageKey = `/${ROUTES.CONTACT_US}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

  // Get localized paths safely
  const localizedPaths = localizationPathname[pageKey] || {
    en: pageKey,
    ar: pageKey
  }

  const url = isAr
    ? `${BASE_URL}${localizedPaths.ar}`
    : `${BASE_URL}/en${localizedPaths.en}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": `${BASE_URL}/#place`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: "21.330184369173214",
          longitude: "39.952206000000004"
        },
        hasMap: data.map_link,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.address[locale],
          addressLocality: isAr ? "مكة" : "Macca",
          addressRegion: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى"
            : "Umm Al-Qura University",
          postalCode: data.postal_code,
          addressCountry: "EG"
        },
        sameAs: [data.facebook_link, data.instagram_link, data.linkedIn_link]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#LocalBusiness`,
        name: isAr ? "نماء" : "Namaa Agency",
        legalName: isAr ? "وكالة حامل الراية" : "Namaa Agency",
        url: BASE_URL,
        email: data.email,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/NAMAA_LOGO.svg`,
          caption: isAr ? "وكالة نماء" : "Namaa Agency",
          inLanguage: isAr ? "ar-SA" : "en-US",
          width: "1000",
          height: "615"
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: data.address[locale],
          addressLocality: isAr ? "مكة" : "Macca",
          addressRegion: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى"
            : "Umm Al-Qura University",
          postalCode: data.postal_code,
          addressCountry: "SA"
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: data.phone1,
            contactType: isAr ? "دعم العملاء" : "customer support"
          }
        ],
        description: isAr
          ? "وكالة Namaa هي وكالة تسويق رقمي متكاملة تقدم خدمات احترافية ..."
          : "Namaa Agency is a full-service digital marketing agency providing professional services ..."
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: isAr ? "وكالة نماء" : "Namaa Agency",
        alternateName: isAr ? "وكالة حامل الراية" : "Namaa Agency",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: isAr ? "ar-SA" : "en-US"
      },
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url: url,
        name: isAr ? "اتصل بنا" : "Contact Us",
        datePublished: data.created_at,
        dateModified: data.updated_at,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        inLanguage: isAr ? "ar-SA" : "en-US"
      }
    ]
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-${url}`}
        items={[
          { name: t("navbar.home"), localed: true, url: `${BASE_URL}/` },
          { name: t("navbar.contat_us"), url: `${url}/` }
        ]}
      />

      <JsonLd schema={schema} id="contact-shema" />

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
              <a href="tel:22561003" target="_blank" rel="follow">
                {data?.landline_1}
              </a>
            ) : null}{" "}
            {data?.landline_2 ? (
              <>
                -{" "}
                <a href="tel:22561004" target="_blank" rel="follow">
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
              <a href={`tel:${data.phone1}`} target="_blank" rel="follow">
                {data?.phone1}
              </a>
            ) : null}
            {data?.phone2 ? (
              <>
                -{" "}
                <a href={`tel:${data.phone2}`} target="_blank" rel="follow">
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
              <a href={`mailto:${data.email}`} target="_blank" rel="follow">
                {data?.email}
              </a>
            ) : null}
          </p>
        </li>
      </ol>
    </>
  )
}
