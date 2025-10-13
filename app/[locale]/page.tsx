import type { Metadata } from "next"
import Container from "@/components/Container"
import Section from "@/components/Section"
import { GoArrowUpRight } from "react-icons/go"
import ServicesTabs from "@/components/ServicesTabs"
import ClientSlider2 from "@/components/CientSlider2"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import AboutSection from "@/components/AboutSection"
import PortofilioSection from "@/components/PortofilioSection"
import TitleLine from "@/components/TitleLine"
import DevelopmentSection from "@/components/DevelopmentSection"
import { getHome } from "@/data-layer/home"
import { getSeoBySlug } from "@/data-layer/common"
import { ROUTES } from "@/constants"
import { localizationPathname } from "@/i18n/localizationPathname"
import Translate from "@/components/Translate"
import { BlogItemType, ProtfolioType } from "@/types.type"
import BlogList from "@/components/BlogList"
import { JsonLd } from "@/components/JsonLd"
import HomeBanner from "@/components/HomeBanner"
import { Link } from "@/i18n/routing"
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd"
import { getTranslations } from "next-intl/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

type Props = {
  params: Promise<{ locale: "ar" | "en" }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ locale }, results] = await Promise.all([
    params,
    getSeoBySlug("home")
  ])

  const pageKey = `/${ROUTES.HOME}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: results.title || undefined, // undefined = use layout default
    description: results.description || results.og_description || undefined,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: results.title || undefined,
      description: results.og_description || results.description || undefined,
      images: results.og_image ? [{ url: results.og_image }] : undefined,
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: results.title || undefined,
      description:
        results.twitter_description || results.description || undefined,
      images: results.twitter_image ? [results.twitter_image] : undefined,
      site: url // optionally override twitter:site/url if needed
    }
  }
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const [{ locale }, t] = await Promise.all([params, getTranslations()])
  const {
    banners,
    protfolio,
    blog,
    aboutUs,
    Website_design_agency_and_web_development,
    services,
    clients
  } = await getHome()

  const isAr = locale === "ar"
 
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
        hasMap: "https://maps.app.goo.gl/dVP9RXEWFtfcFPf66",
        address: {
          "@type": "PostalAddress",
          streetAddress: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى , مكه المكرمه , المملكه العربيه السعودية 1111"
            : " Umm Al-Qura University , 4299, 7310, wadi Makkah 24381",
          addressLocality: isAr ? "مكه" : "Macca",
          addressRegion: isAr
            ? "جامعة ام القرى العوالى مبنى وادى مكه الادارى"
            : "Umm Al-Qura University",
          postalCode: "11331",
          addressCountry: "SA"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#LocalBusiness`,
        name: "Namaa Agency",
        alternateName: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency",
        url: BASE_URL,
        email: "info@namaasolutions.com",
        logo: `${BASE_URL}/NAMAA_LOGO.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+966536322194",
          contactType: isAr ? "الدعم الفني" : "customer support"
        },
        description: isAr
          ? "وكالة نماء هي وكالة تسويق رقمي متكاملة الخدمات تقدم خدمات احترافية في تصميم المواقع الإلكترونية، وبناء العلامات التجارية، وإدارة وسائل التواصل الاجتماعي، واستراتيجيات التسويق الإلكتروني المصممة خصيصًا"
          : "Namaa Agency is a full-service digital marketing agency offering professional services in web design, branding, social media management, and tailored online marketing strategies.",
        legalName: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency",
        location: { "@id": `${BASE_URL}/#place` }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency Home Page",
        alternateName: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        url: BASE_URL,
        name: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency Home Page",
        alternateName: isAr ? "الصفحة الرئيسية لوكالة Namaa" : "Namaa Agency",
        datePublished: "2020-09-03T15:57:47+02:00",
        dateModified: "2025-08-27T12:04:40+03:00",
        about: { "@id": `${BASE_URL}/#organization` },
        isPartOf: { "@id": `${BASE_URL}/#website` },
        primaryImageOfPage: `${BASE_URL}/namaa-otg.jpg`,
        inLanguage: ["ar", "en"]
      }
    ]
  }

  return (
    <>
      <BreadcrumbJsonLd
        id={`breadcrumb-home`}
        items={[{ name: t("navbar.home"), localed: true, url: `${BASE_URL}/` }]}
      />

      <JsonLd id="main-jsonld" schema={schema} />

      <HomeBanner data={banners} className="py-12 lg:py-20 bg-[#F9F9F9]" />

      <AboutSection data={aboutUs} className="py-12 lg:py-20 bg-background">
        <Link href={`/${ROUTES.ABOUT_US}`} className="mb-5 lg:mb-0">
          <ButtonWithIcon
            icon={<GoArrowUpRight className="text-foreground" />}
            iconClass="bg-background"
            variant="green"
          >
            <span>
              <Translate id="actions.read_more" />
            </span>
          </ButtonWithIcon>
        </Link>
      </AboutSection>

      <Section className="py-12 lg:py-16 bg-[#F9F9F9]">
        <Container>
          <div className="text-center">
            <p className="text-primary">
              “<Translate id="services.tagline2" />”
            </p>
            <TitleLine
              heading={<Translate id="services.title2" />}
              titleClass="text-3xl lg:text-4xl text-foreground"
              className="inline-block mt-2 max-w-2xl"
              showLines={false}
            />
          </div>
          <ServicesTabs showMore={true} data={services} />
        </Container>
      </Section>

      <DevelopmentSection
        data={Website_design_agency_and_web_development}
        className="bg-[#EFEFEF] relative"
      />

      <PortofilioAsync data={protfolio} />

      <Section className="py-12 bg-[#F9F9F9]">
        <Container>
          <div className="text-center">
            <p className="text-muted-foreground">
              <Translate id="clients.tagline" />
            </p>
            <TitleLine
              heading={<Translate id="clients.title" />}
              titleClass="text-3xl lg:text-4xl"
              className="inline-block mt-1 mb-0"
            />
          </div>

          <ClientSlider2 data={clients} />
        </Container>
      </Section>

      <BlogAsync data={blog} />
    </>
  )
}

function PortofilioAsync({ data }: { data: ProtfolioType[] }) {
  if (!data || data.length === 0) return null
  return (
    <PortofilioSection
      list={data.slice(0, 4)}
      className="py-12 lg:py-20 bg-background"
    />
  )
}

function BlogAsync({ data }: { data: BlogItemType[] }) {
  if (!data || data.length === 0) return null

  return (
    <Section className="py-12 lg:py-16 bg-[#f4f4f4]">
      <Container>
        <div className="text-center">
          <TitleLine
            heading={<Translate id="blog.hero_title" />}
            titleClass="text-3xl lg:text-4xl text-foreground"
            className="inline-block mt-2 max-w-2xl"
            showLines={false}
          />
        </div>
      </Container>

      <BlogList data={data} />

      <div className="mx-auto flex justify-center items-center p-6">
        <Link href={`/${ROUTES.BLOG}`}>
          <ButtonWithIcon
            asChild
            icon={<GoArrowUpRight className="text-foreground" />}
            iconClass="bg-background"
          >
            <span className="px-10">
              <Translate id="actions.more" />
            </span>
          </ButtonWithIcon>
        </Link>
      </div>
    </Section>
  )
}
