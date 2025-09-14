import type { Metadata } from "next"
import Container from "@/components/Container"
import Section from "@/components/Section"
import Image from "next/image"
import { GoArrowUpRight } from "react-icons/go"
import ServicesTabs from "@/components/ServicesTabs"
import ClientSlider2 from "@/components/CientSlider2"
import { ButtonWithIcon } from "@/components/ui/button-with-icon"
import AnimatedLetters from "@/components/AnimatedLetters"
import AboutSection from "@/components/AboutSection"
import PortofilioSection from "@/components/PortofilioSection"
import TitleLine from "@/components/TitleLine"
import DevelopmentSection from "@/components/DevelopmentSection"
import { Suspense } from "react"
import { getHome } from "@/data-layer/home"
import { getSeoBySlug } from "@/data-layer/common"
import AnimatedPageLink from "@/components/AnimatedPageLink"
import { ROUTES } from "@/constants"
import Counter from "@/components/Counter"
import { localizationPathname } from "@/i18n/localizationPathname"
import { getLocale } from "next-intl/server"
import Translate from "@/components/Translate"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, results] = await Promise.all([
    getLocale(),
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
    ...results,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}`
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

export default function HomePage() {
  return (
    <>
      <Section className="py-12 lg:py-20 bg-[#F9F9F9]">
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className=" flex-1 lg:flex-[1.1] space-y-8 lg:space-y-12 relative">
            <h1 className="scroll-m-20 text-4xl lg:text-6xl font-semibold">
              <span className="inline-block text-primary p-1 border border-primary/50 rounded-lg relative">
                <AnimatedLetters
                  text={<Translate id="home.main_banner.digital_market" />}
                />
                <span className="absolute -top-2 -left-2 w-3 h-3 border border-primary/50 rounded rotate-animation"></span>
                <span className="absolute -top-2 -right-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.3s]"></span>
                <span className="absolute -bottom-2 -left-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.6s]"></span>
                <span className="absolute -bottom-2 -right-2 w-3 h-3 border border-primary/50 rounded rotate-animation [animation-delay:0.9s]"></span>
              </span>{" "}
              <Translate id="home.main_banner.digital_market_tagline" />
            </h1>

            <p>
              <Translate id="home.main_banner.p1" />
            </p>

            <div className="flex items-center gap-6">
              <AnimatedPageLink href={`/${ROUTES.ABOUT_US}`}>
                <ButtonWithIcon
                  icon={<GoArrowUpRight className="text-foreground" />}
                  iconClass="bg-background"
                  variant="green"
                >
                  <span>
                    <Translate id="actions.read_more" />
                  </span>
                </ButtonWithIcon>
              </AnimatedPageLink>

              <AnimatedPageLink href={`/${ROUTES.CONTACT_US}`}>
                <ButtonWithIcon
                  variant="outline"
                  icon={<GoArrowUpRight className="text-background" />}
                  iconClass="bg-primary-green"
                  className="bg-transparent border-primary-green hover:bg-background"
                >
                  <span>
                    <Translate id="navbar.contact_us" />
                  </span>
                </ButtonWithIcon>
              </AnimatedPageLink>
            </div>

            <div className="flex w-full items-center gap-18">
              <div className="flex flex-col gap-1">
                <h2 className="scroll-m-20 text-6xl font-semibold">
                  <Counter value={23} defaultValue={0} suffix="+" />
                </h2>
                <h3 className="text-lg text-muted-foreground">
                  <Translate id="home.main_banner.experience" />
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="scroll-m-20 text-6xl font-semibold">
                  <Counter value={498} defaultValue={0} suffix="+" />
                </h2>
                <h3 className="text-lg text-muted-foreground">
                  <Translate id="home.main_banner.project_completed" />
                </h3>
              </div>
            </div>

            <Image
              src="/mask_1.png"
              alt="frame shap"
              width={128}
              height={68}
              className="slide-x-animation lg:absolute lg:-right-16 lg:bottom-12 lg:-translate-y-1/3"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center  lg:justify-end flex-1 lg:flex-[.9]  max-h-[500px]">
            <Image
              src="/home_slide_1.svg"
              alt="slide_1"
              width={839}
              height={636}
              className="bounce-animation object-contain max-w-[80%] lg:max-w-full"
            />
          </div>
        </Container>
      </Section>

      <AboutSection className="py-12 lg:py-20 bg-background">
        <AnimatedPageLink href={`/${ROUTES.ABOUT_US}`} className="mb-5 lg:mb-0">
          <ButtonWithIcon
            icon={<GoArrowUpRight className="text-foreground" />}
            iconClass="bg-background"
            variant="green"
          >
            <span>
              <Translate id="actions.read_more" />
            </span>
          </ButtonWithIcon>
        </AnimatedPageLink>
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
          <ServicesTabs showMore={true} />
        </Container>
      </Section>

      <DevelopmentSection className="bg-[#EFEFEF] relative" />

      <Suspense fallback={null}>
        <PortofilioAsync />
      </Suspense>

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

          <ClientSlider2 />
        </Container>
      </Section>
    </>
  )
}

async function PortofilioAsync() {
  const data = await getHome()
  const { protfolio } = data

  return (
    <PortofilioSection
      list={protfolio}
      className="py-12 lg:py-20 bg-background"
    />
  )
}