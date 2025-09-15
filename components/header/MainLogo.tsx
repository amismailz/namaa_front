import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants"
import { Link } from "@/i18n/routing"

const MainLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/${ROUTES.HOME}`} className="block py-2">
        <Image
          src="/NAMAA_LOGO.svg"
          alt="logo icon"
          width={169}
          height={100}
          className="w-auto min-w-[10px] h-[60px] lg:h-[80px]"
          priority
        />
      </Link>
    </div>
  )
}

export default MainLogo
