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

  const pageKey = `/${ROUTES.PRIVACY}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.privacy_policy.title"),
    description: t("seo.privacy_policy.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": `${BASE_URL}${localizedPaths.ar}`
      }
    },
    openGraph: {
      title: t("seo.privacy_policy.title"),
      description: t("seo.privacy_policy.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.privacy_policy.title"),
      description: t("seo.privacy_policy.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

const PrivacyPolicyPage = () => {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.privacy_policy" />}
        breadcrumb={[
          { text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }
        ]}
      />

      <Section className="py-10">
        <Container className="space-y-10">
          <p>
            THIS PRIVACY POLICY (THE “POLICY”) EXPLAINS THE PRIVACY PROCEDURES
            PERFORMED BY “ENSIGN AGENCY” A COMPANY OF “ENSIGN AGENCY” (THE
            “COMPANY”, “ENSIGN AGENCY”, “ENSIGN AGENCY”, “WE” OR “US”) IN
            PROVIDING SERVICES TO ITS CUSTOMERS (“CLIENT”, “YOU”, OR “YOUR”) AND
            SHOULD BE READ IN CONJUNCTION WITH THE COMPANY’S TERMS &amp;
            CONDITIONS.
          </p>

          <h4 className="text-3xl font-medium">Collecting Information</h4>
          <p>
            THE COMPANY COLLECTS INFORMATION ABOUT YOU THROUGH THE FOLLOWING
            MEANS:
          </p>
          <ol>
            <li>– WHEN YOU PROVIDE INFORMATION THROUGH THE WEBSITE</li>
            <li>
              – WHEN YOU PROVIDE INFORMATION DURING YOUR COMMUNICATIONS WITH
            </li>
          </ol>

          <h4 className="text-3xl font-medium">US</h4>
          <p>
            INFORMATION WE COLLECT FROM YOU MAY INCLUDE INFORMATION ABOUT YOUR
            COMPUTER, INCLUDING YOUR IP ADDRESS, OPERATING SYSTEM AND BROWSER
            TYPE, INFORMATION ABOUT YOU, INCLUDING YOUR EMAIL ADDRESS, TELEPHONE
            NUMBER AND LOCATION, INFORMATION ABOUT YOUR USE OF THE SERVICES,
            YOUR CREDIT CARD INFORMATION, AND ANY OTHER INFORMATION WE MAY
            REQUIRE IN ORDER TO PROVIDE YOU WITH THE SERVICES. WE MAY ALSO
            RECORD AND MONITOR PHONE CALLS BETWEEN YOU AND COMPANY
            REPRESENTATIVES FOR QUALITY CHECKS.
          </p>

          <h4 className="text-3xl font-medium">Use of Information</h4>
          <p>
            THE INFORMATION THAT WE COLLECT FROM YOU IS USED FOR IN THE
            FOLLOWING WAYS:
          </p>
          <p>TO OPERATE AND MANAGE YOUR USE OF THE SERVICES</p>
          <p>TO PERSONALIZE YOUR EXPERIENCE IN USING THE SERVICES</p>
          <p>TO ASSESS YOUR SUITABILITY FOR USING THE SERVICES</p>
          <p>TO IDENTIFY, PREVENT, DETECT OR TACKLE FRAUD AND OTHER CRIMES</p>
          <p>TO ADMINISTER A CONTEST, PROMOTION OR SURVEY</p>
          <p>TO SEND PERIODIC PROMOTIONAL EMAILS</p>
          <p>TO PROCESS TRANSACTIONS, AND,</p>
          <p>TO IMPROVE CUSTOMER SERVICE.</p>
          <p>
            ADDITIONALLY, YOUR EMAIL ADDRESS MAY BE USED TO SEND YOU INFORMATION
            AND UPDATES PERTAINING TO THE SERVICES, IN ADDITION TO RECEIVING
            OCCASIONAL COMPANY NEWS, UPDATES, RELATED PRODUCT OR SERVICE
            INFORMATION AND PROMOTIONS. IF AT ANY TIME YOU WOULD LIKE TO
            UNSUBSCRIBE FROM RECEIVING SUCH EMAILS, CLICK ON THE UNSUBSCRIBE
            LINK AT THE BOTTOM OF ONE OF THE EMAILS.
          </p>
          <h4 className="text-3xl font-medium">Protecting Your Information</h4>

          <p>
            I IMPLEMENT A VARIETY OF SECURITY MEASURES TO MAINTAIN THE SAFETY OF
            YOUR PERSONAL INFORMATION WHEN YOU PLACE AN ORDER OR ENTER, SUBMIT,
            OR ACCESS YOUR PERSONAL INFORMATION.
          </p>

          <h4 className="text-3xl font-medium">Use of Cookies</h4>

          <p>
            THE COMPANY MAY USE COOKIES TO TRACK USAGE PATTERNS ON THE WEBSITE,
            TO PERSONALIZE CONTENT, AS WELL AS TO FACILITATE AN IMPROVED USER
            EXPERIENCE (FOR EXAMPLE, BY SPEEDING UP YOUR LOG-IN WHEN YOU VISIT
            THE WEBSITE).
          </p>
          <h4 className="text-3xl font-medium">
            Disclosing information to outside parties
          </h4>

          <p>
            NO PERSONAL INFORMATION WILL BE SHARED WITH ANY THIRD PARTIES
            WITHOUT YOUR PERMISSION. THE COMPANY DOES NOT SELL, TRADE, OR
            OTHERWISE TRANSFER TO OUTSIDE PARTIES YOUR PERSONALLY IDENTIFIABLE
            INFORMATION. THE COMPANY MAY RELEASE YOUR INFORMATION WHEN IT HAS
            GROUNDS TO BELIEVE SUCH RELEASE IS APPROPRIATE TO COMPLY WITH THE
            LAW, TO ENFORCE SITE POLICIES, OR TO PROTECT OUR OWN (OR OTHERS’)
            RIGHTS, PROPERTY, OR SAFETY. NON-PERSONALLY IDENTIFIABLE VISITOR
            INFORMATION MAY BE PROVIDED TO OTHER PARTIES FOR MARKETING,
            ADVERTISING, OR OTHER USES.
          </p>
          <h4 className="text-3xl font-medium"> Third party links</h4>

          <p>
            OCCASIONALLY, AT THE COMPANY’S DISCRETION, WE MAY INCLUDE OR OFFER
            THIRD PARTY PRODUCTS OR SERVICES ON THIS WEBSITE. THESE THIRD PARTY
            SITES HAVE SEPARATE AND INDEPENDENT PRIVACY POLICIES. THE COMPANY
            HAS NO RESPONSIBILITY OVER AND ASSUMES NO LIABILITY FOR THE CONTENT
            AND ACTIVITIES OF THESE LINKED SITES. NONETHELESS, THE COMPANY SEEKS
            TO PROTECT THE INTEGRITY OF THIS WEBSITE AND WELCOMES ANY FEEDBACK
            ABOUT THESE THIRD PARTY SITES.
          </p>

          <h4 className="text-3xl font-medium">
            Disclosing information to outside parties
          </h4>
          <p>Your consent</p>
          <p>
            BY USING THIS WEBSITE AND THE ASSOCIATED SERVICES, YOU CONSENT TO
            THE POLICY.
          </p>
          <h4 className="text-3xl font-medium">
            Disclosing information to outside parties
          </h4>
          <p>Changes to the Policy</p>
          <p>
            THE COMPANY RESERVES THE RIGHT AMEND THE POLICY. PLEASE CHECK BACK
            REGULARLY TO SEE UPDATES TO THE POLICY. YOUR CONTINUED USE OF THE
            WEBSITE AND SERVICES FOLLOWING UPDATES TO THE POLICY INDICATES YOUR
            ACCEPTANCE OF SUCH UPDATES.
          </p>
        </Container>
      </Section>
    </>
  )
}

export default PrivacyPolicyPage
