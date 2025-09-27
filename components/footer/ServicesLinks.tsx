import { getServersNavigation } from "@/data-layer/common"
import { Link } from "@/i18n/routing"
import React from "react"

const ServicesLinks = async () => {
  const servicesChildren = await getServersNavigation()
  const data = servicesChildren.slice(0, 6)
  return (
    <ul className="grid grid-cols-2 gap-2 lg:gap-4 font-light">
      {data.map((item, idx) => (
        <li key={idx} className="hover:text-primary transition-colors">
          <Link href={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ServicesLinks
