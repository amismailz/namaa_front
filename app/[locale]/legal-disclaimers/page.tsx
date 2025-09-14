import Container from "@/components/Container"
import HeroPage from "@/components/HeroPage"
import Section from "@/components/Section"
import Translate from "@/components/Translate"
import { ROUTES } from "@/constants"
import { localizationPathname } from "@/i18n/localizationPathname"
import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import React, { cache } from "react"

const translation = cache(getTranslations)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), translation()])

  const pageKey = `/${ROUTES.LEGAL}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.legal_disclaimers.title"),
    description: t("seo.legal_disclaimers.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      title: t("seo.legal_disclaimers.title"),
      description: t("seo.legal_disclaimers.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.legal_disclaimers.title"),
      description: t("seo.legal_disclaimers.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

const LegalDisclaimersPage = () => {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.legal_disclaimers" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-10">
        <Container className="space-y-10">
          <h2 className="text-4xl font-medium">legal disclaimers</h2>
          <p>
            PLEASE READ THIS CAREFULLY BECAUSE IT SETS OUT THE TERMS OF A
            LEGALLY BINDING AGREEMENT BETWEEN YOU (THE “CLIENT”, “YOU”, OR
            “YOUR”) AND “ENSIGNAGENCY” A COMPANY OF “ENSIGN AGENCY” (THE
            “COMPANY”, “ENSIGNAGENCY”, “ENSIGN AGENCY”, “WE” OR “US”), THE OWNER
            AND OPERATOR OF ENSIGNAGENCY.COM,WHOSE OFFICE IS LOCATED AT 78 Gesr
            Al Suez St Roxy Cairo-Egypt;Kasr El Tahra Tower Floor 2 Office 4.
          </p>
          <p>
            THIS PAGES SETS OUT THE TERMS &amp; CONDITIONS (THE “TERMS”) ON
            WHICH YOU MAY USE THE ENSIGNAGENCY.COM WEBSITE AND THE
            CONTENT/SERVICES AVAILABLE THROUGH IT (COLLECTIVELY, THE
            “SERVICES”).
          </p>
          <p>
            ACCEPTANCE OF TERMS OF SERVICE. BY USING THE SERVICES, IRRESPECTIVE
            OF THE DELIVERY PLATFORM YOU USE TO ACCESS THEM, YOU ACKNOWLEDGE AND
            AGREE TO BE BOUND BY THE TERMS. IF YOU DO NOT AGREE WITH ANY OF
            THESE TERMS AND CONDITIONS, YOU ARE NOT PERMITTED TO USE THE
            SERVICES.
          </p>
          <h4 className="text-3xl font-medium">Changes to Terms of Service</h4>
          <p>
            RIGHT TO CHANGE TERMS. THE COMPANY RESERVES THE RIGHT, IN ITS SOLE
            DISCRETION, TO CHANGE THESE TERMS (“UPDATED TERMS”) FROM TIME TO
            TIME.
          </p>
          <p>
            NOTICE OF UPDATED TERMS. YOU AGREE THAT THE COMPANY MAY NOTIFY YOU
            OF THE UPDATED TERMS BY POSTING THEM ON THIS PAGE.
          </p>
          <p>
            ACCEPTANCE OF UPDATED TERMS. YOUR USE OF THE SERVICES AFTER THE
            EFFECTIVE DATE OF THE UPDATED TERMS CONSTITUTES YOUR ACCEPTANCE OF
            THE UPDATED TERMS.
          </p>
          <p>
            EFFECTIVE DATE OF UPDATED TERMS. THE UPDATED TERMS WILL BE EFFECTIVE
            AS OF THE TIME OF POSTING, OR SUCH LATER DATE AS MAY BE SPECIFIED IN
            THE UPDATED TERMS, AND WILL APPLY TO YOUR USE OF THE SERVICES FROM
            THAT POINT FORWARD.
          </p>
          <h4 className="text-3xl font-medium">Use of Services</h4>
          <p>
            LICENSE. DURING THE TERM OF THIS AGREEMENT, THE COMPANY GRANTS YOU A
            LIMITED, NON-EXCLUSIVE, NON-TRANSFERABLE LICENSE TO ACCESS THE
            SERVICES FOR YOUR PERSONAL AND NON-COMMERCIAL USE IN ACCORDANCE WITH
            THESE TERMS.
          </p>
          <p>
            INTELLECTUAL PROPERTY RIGHTS. THE DESIGN, TRADEMARKS, SERVICE MARKS,
            AND LOGOS OF THE SERVICES (“MARKS”), ARE OWNED BY OR LICENSED TO THE
            COMPANY, SUBJECT TO COPYRIGHT AND OTHER INTELLECTUAL PROPERTY RIGHTS
            UNDER THE LAWS OF THE UNITED KINGDOM, FOREIGN LAWS AND INTERNATIONAL
            CONVENTIONS. THE COMPANY RESERVES ALL RIGHTS NOT EXPRESSLY GRANTED
            IN AND TO THE SERVICES. YOU AGREE TO NOT ENGAGE IN THE USE, COPYING,
            OR DISTRIBUTION OF ANY OF THE SERVICES OTHER THAN EXPRESSLY
            PERMITTED.
          </p>
          <h4 className="text-3xl font-medium">User Conduct</h4>
          <p>
            YOU MAY NOT ENGAGE IN ANY OF THE FOLLOWING PROHIBITED ACTIVITIES:
          </p>
          <p>
            COPYING, DISTRIBUTING, OR DISCLOSING ANY PART OF THE SERVICES IN ANY
            MEDIUM, INCLUDING WITHOUT LIMITATION BY ANY AUTOMATED OR
            NON-AUTOMATED “SCRAPING”
          </p>
          <p>
            USING ANY AUTOMATED SYSTEM, INCLUDING WITHOUT LIMITATION “ROBOTS,”
            “SPIDERS,” “OFFLINE READERS,” AND OTHER SUCH SYSTEMS, TO ACCESS THE
            SERVICES,
          </p>
          <p>TRANSMITTING SPAM, CHAIN LETTERS, OR OTHER UNSOLICITED EMAIL,</p>
          <p>
            ATTEMPTING TO INTERFERE WITH, COMPROMISE THE SYSTEM INTEGRITY OR
            SECURITY, OR DECIPHER ANY TRANSMISSIONS TO OR FROM THE SERVERS
            RUNNING THE SERVICES,
          </p>
          <p>
            AKING ANY ACTION THAT IMPOSES, OR MAY IMPOSE AT OUR SOLE DISCRETION
            AN UNREASONABLE OR DISPROPORTIONATELY LARGE LOAD ON SERVICES’
            INFRASTRUCTURE,
          </p>
          <p>
            UPLOADING INVALID DATA, VIRUSES, WORMS, OR OTHER SOFTWARE AGENTS
            THROUGH THE SERVICES,
          </p>
          <p>
            COLLECTING OR HARVESTING ANY PERSONALLY IDENTIFIABLE INFORMATION,
            INCLUDING ACCOUNT NAMES, FROM THE SERVICES,
          </p>
          <p>USING THE SERVICES FOR ANY COMMERCIAL SOLICITATION PURPOSES,</p>
          <p>
            IMPERSONATING ANOTHER PERSON OR OTHERWISE MISREPRESENTING YOUR
            AFFILIATION WITH A PERSON OR ENTITY, CONDUCTING FRAUD, HIDING OR
            ATTEMPTING TO HIDE YOUR IDENTITY,
          </p>
          <p>INTERFERING WITH THE PROPER WORKING OF THE SERVICES,</p>
          <p>
            ACCESSING ANY CONTENT ON THE SERVICES THROUGH ANY TECHNOLOGY OR
            MEANS OTHER THAN THOSE PROVIDED OR AUTHORIZED BY THE COMPANY, OR
          </p>
          <p>
            BYPASSING THE MEASURES WE MAY USE TO PREVENT OR RESTRICT ACCESS TO
            THE SERVICES, INCLUDING WITHOUT LIMITATION FEATURES THAT PREVENT OR
            RESTRICT USE OR COPYING OF ANY CONTENT OR ENFORCE LIMITATIONS ON USE
            OF THE SERVICES.
          </p>
          <h4 className="text-3xl font-medium">Your Account</h4>
          <p>
            ACCOUNT CREATION. YOU MUST COMPLETE THE REGISTRATION PROCESS BY
            PROVIDING THE COMPANY WITH CURRENT, COMPLETE, AND ACCURATE
            INFORMATION AS PROMPTED BY THE APPLICABLE REGISTRATION FORM. YOU
            ALSO WILL CHOOSE A PASSWORD AND A USER NAME.
          </p>
          <p>
            RESPONSIBILITY FOR ACCOUNT. YOU ARE ENTIRELY RESPONSIBLE FOR
            MAINTAINING THE CONFIDENTIALITY OF YOUR PASSWORD AND ACCOUNT.
            FURTHERMORE, YOU ARE ENTIRELY RESPONSIBLE FOR ANY AND ALL ACTIVITIES
            THAT OCCUR UNDER YOUR ACCOUNT. YOU AGREE TO NOTIFY THE COMPANY
            IMMEDIATELY OF ANY UNAUTHORIZED USE OF YOUR ACCOUNT OR ANY OTHER
            BREACH OF SECURITY.
          </p>
          <p>
            LIABILITY FOR ACCOUNT MISUSE. THE COMPANY WILL NOT BE LIABLE FOR ANY
            LOSS THAT YOU MAY INCUR AS A RESULT OF SOMEONE ELSE USING YOUR
            PASSWORD OR ACCOUNT, EITHER WITH OR WITHOUT YOUR KNOWLEDGE. YOU
            COULD BE HELD LIABLE FOR LOSSES INCURRED BY THE COMPANY OR ANOTHER
            PARTY DUE TO SOMEONE ELSE USING YOUR ACCOUNT OR PASSWORD.
          </p>
          <p>
            USE OF OTHER ACCOUNTS. YOU MAY NOT USE ANYONE ELSE’S ACCOUNT AT ANY
            TIME, WITHOUT THE PERMISSION OF THE ACCOUNT HOLDER.
          </p>
          <p>
            ACCOUNT SECURITY. THE COMPANY CARES ABOUT THE INTEGRITY AND SECURITY
            OF YOUR PERSONAL INFORMATION. HOWEVER, THE COMPANY CANNOT GUARANTEE
            THAT UNAUTHORIZED THIRD PARTIES WILL NEVER BE ABLE
          </p>
        </Container>
      </Section>
    </>
  )
}

export default LegalDisclaimersPage
