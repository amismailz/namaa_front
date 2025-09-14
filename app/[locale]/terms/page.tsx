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

  const pageKey = `/${ROUTES.TERMS}` // <-- replace with current page route // e.g., 'contact-us', 'about-us', etc.

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
    title: t("seo.terms.title"),
    description: t("seo.terms.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${localizedPaths.en}`,
        ar: `${BASE_URL}${localizedPaths.ar}`,
        "x-default": BASE_URL
      }
    },
    openGraph: {
      title: t("seo.terms.title"),
      description: t("seo.terms.description"),
      url: url // <-- override og:url here
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo.terms.title"),
      description: t("seo.terms.description"),
      site: url // optionally override twitter:site/url if needed
    }
  }
}

const TermsPage = () => {
  return (
    <>
      <HeroPage
        heading={<Translate id="navbar.terms" />}
        breadcrumb={[{ text: <Translate id="navbar.home" />, link: `/${ROUTES.HOME}` }]}
      />

      <Section className="py-10">
        <Container className="space-y-10">
          <h4 className="text-3xl font-medium">Binding effect</h4>
          <p>
            This is a binding agreement (the “Agreement”). By using the site at
            ensignagency.com (the “Site”) or any content or services provided in
            connection with the Site (the “Service”), you agree to abide by
            these Terms and Conditions, as they may be amended by ensign agency
            “a company of Ensign Agency ” (“Company”) at any time.
          </p>
          <h4 className="text-3xl font-medium">ou’re over 18 years old</h4>

          <p>
            You agree to pay any prices as listed and realize that all purchases
            are refundable or non-refundable besd on the product or service it
            self and we will show you the condition very clear in the payment
            page . For recurring billing, you authorize Company to initiate
            debit charges from your supplied payment source.
          </p>

          <h4 className="text-3xl font-medium">License</h4>

          <p>
            Company maintains full ownership of all intellectual property,
            creative content and other rights, title, and interest in and to the
            Site or Service, and the materials accessible on the Site and
            Service. Without limitation, Company owns trademarks, copyrights,
            and certain technology used in making the Site and Service
            available. You acquire only those rights, title or interest that is
            expressly conveyed. Any violations of this license will result in
            immediate termination of use.
          </p>

          <h4 className="text-3xl font-medium">Confidentiality</h4>

          <p>
            For the purpose of this Agreement, “Confidential Information” shall
            include all information that is marked as confidential or is labeled
            as confidential verbally at the time of discussion. You agree that
            you will not slander or make derogatory comments &amp;mdash either
            spoken or written &amp;mdash or otherwise disparage myself or any of
            my colleagues or coaching clients.
          </p>

          <h4 className="text-3xl font-medium">Spam policy</h4>

          <p>
            You may not use my Site, Service or trainings to engage in shady
            marketing activities, including without limitation spamming. You
            will market in compliance with the CAN-SPAM Act at all times, with
            each email sent.
          </p>

          <h4 className="text-3xl font-medium">Testimonials</h4>

          <p>
            You will comply with policies set forth by the Federal Trade
            Commission (FTC) with all marketing efforts. If you’re invited to
            promote ensign agency, you must disclose your affiliate relationship
            and refrain from using hype or high-pressure to facilitate sales.
          </p>

          <h4 className="text-3xl font-medium">Availability</h4>

          <p>
            You agree that using false scarcity tactics is unethical and will
            refrain from doing so. Additionally, all pricing information must be
            listed accurately according to current market standards.
          </p>

          <h4 className="text-3xl font-medium">Marketing</h4>

          <p>
            Always be upfront about the amount of work that will be required to
            have success with any internet business. Whenever possible, refer
            leads to an income disclaimer that reports typical earnings for said
            company.
          </p>

          <h4 className="text-3xl font-medium">Copyright infringement</h4>

          <p>
            If you believe in good faith that ensign agency has violated your
            copyrights and you want Company to delete, edit, or disable the
            material in question, you must provide the exact URL where the
            infringement has taken place, a clear description of the violation
            and a contact name and number.
          </p>

          <h4 className="text-3xl font-medium">Warranties</h4>

          <p>Company does not issue warranties or offer refunds of any kind.</p>

          <h4 className="text-3xl font-medium">Limited liability</h4>

          <p>
            To the absolute fullest extent that is allowed by law, in no
            scenario will Company be liable for damages of any kind, including,
            but not limited to, loss of profits or investment. You have read and
            understood the Income Disclaimer listed on this website.
          </p>

          <h4 className="text-3xl font-medium">Related websites</h4>

          <p>
            Company is not responsible for the content or actions of any
            external websites that may be linked out to, or that have pointed
            income links.
          </p>

          <h4 className="text-3xl font-medium">Affiliate relationships</h4>

          <p>
            It should be noted that outgoing links to products, services, lead
            capture pages and MLM business opportunity websites are likely
            Company’s affiliate or partner links. In most cases, Company will be
            compensated for any purchases you make as a result of clicking those
            links. Potential for biases do exist and you will perform due
            diligence before making any and all purchases.
          </p>

          <h4 className="text-3xl font-medium">Notices</h4>

          <p>
            To give notice to Company, you will use the contact information
            listed here.
          </p>

          <h4 className="text-3xl font-medium">Indemnity</h4>

          <p>
            You agree to indemnify, defend, and hold Company free from and
            against all actions, claims, demands, proceedings, liabilities,
            damages, judgments, settlements, fines, penalties, costs, and
            expenses, including attorneys’ fees and related costs, regardless of
            attributing circumstances or actions.
          </p>

          <h4 className="text-3xl font-medium">Governing law</h4>

          <p>
            These Terms and Conditions shall be followed in accordance with the
            laws of the United States and Egypt.
          </p>

          <h4 className="text-3xl font-medium">Modifications</h4>

          <p>
            Company may alter these Terms and Conditions or discontinue the Site
            or Service at any time. Any revisions will be posted immediately and
            will take effect at time of publishing. Your continued use of the
            Site or Service following revisions will constitute your
            understanding and acknowledgement of all such changes.
          </p>

          <h4 className="text-3xl font-medium">Miscellaneous</h4>

          <div className="space-y-5">
            <p>
              No agency, partnership, joint venture, or employee-employer
              relationship is intended or created by this Agreement.
            </p>

            <p>
              Office address:78 Gesr Al Suez St Roxy Cairo-Egypt;Kasr El Tahra
              Tower Floor 2 Office 4
            </p>

            <p>Cell Phone:+201148898881</p>

            <p>postal code:11331</p>

            <p>Email:wael.sayed@ensignagency.com</p>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default TermsPage
