import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing"

const MainLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/`} className="block py-2 relative ">
        <Image
          src="/NAMAA_LOGO.jpg"
          alt="Namaa logo"
          width={169}
          height={100}
          // fill
          className="w-auto bg-transparent min-w-[100px] h-[90px] lg:h-[100px]"
          // className="object-contain"
          priority
          quality={100}
        />
      </Link>
    </div>
  )
}

export default MainLogo
