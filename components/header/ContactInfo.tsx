import React from "react"
import { BsFillPhoneFill, BsClockFill } from "react-icons/bs"
import { MdEmail } from "react-icons/md"

type Props = {
  whatsApp?: string
  email?: string
  workingHours?: string
}

const normalizePhone = (phone?: string) => {
  if (!phone) return undefined
  return phone.replace(/\s+/g, "") // strip spaces
}

const isValidEmail = (email?: string) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const ContactInfo = ({
  whatsApp,
  email,
  workingHours = "Sat - Thurs 9am to 5pm"
}: Props) => {
  const phone = normalizePhone(whatsApp)

  return (
    <nav className="flex flex-wrap items-center gap-6 font-medium">
      {phone && (
        <a
          href={`tel:${phone}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex gap-1 items-center py-3 hover:text-primary transition-colors"
          aria-label="Call us on WhatsApp"
        >
          <BsFillPhoneFill className="text-primary shrink-0" />
          <span className="text-sm">{whatsApp}</span>
        </a>
      )}

      {isValidEmail(email) && (
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex gap-1 items-center py-3 hover:text-primary transition-colors"
          aria-label="Send us an email"
        >
          <MdEmail className="text-primary shrink-0" />
          <span className="text-sm">{email}</span>
        </a>
      )}

      {workingHours && (
        <span
          className="flex gap-1 items-center py-3 text-muted-foreground"
          aria-label="Working hours"
        >
          <BsClockFill className="text-primary shrink-0" />
          <span className="text-sm">{workingHours}</span>
        </span>
      )}
    </nav>
  )
}

export default ContactInfo
