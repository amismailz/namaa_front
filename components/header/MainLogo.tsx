import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants"
import { Link } from "@/i18n/routing"

const MainLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Link
        href={`/${ROUTES.HOME}`}
        className="block py-2 relative "
      >
        <Image
          src="/NAMAA_LOGO.svg"
          alt="logo icon"
          width={169}
          height={100}
          // fill
          className="w-auto min-w-[100px] h-auto lg:h-[80px]"
          // className="object-contain"
          priority
          quality={100}
        />
      </Link>
    </div>
  )
}

export default MainLogo
