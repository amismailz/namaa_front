import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing"

const MainLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/`} className="block py-2 relative ">
        <Image
          src="/NAMAA_LOGO.png"
          alt="Namaa logo"
          width={4181}
          height={4181}
          // fill
          className="w-auto bg-transparent h-[90px] lg:h-[100px]"
          // className="object-contain"
          priority
          quality={100}
        />
      </Link>
    </div>
  )
}

export default MainLogo
