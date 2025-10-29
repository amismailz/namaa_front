import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IoArrowForward, IoArrowBack } from "react-icons/io5"
import { BlogItemType } from "@/types.type"
import {Link} from "@/i18n/routing"

const BlogItem = ({ item, locale }: { item: BlogItemType, locale: string }) => {
  const ArrowComponent = locale === "ar" ? <IoArrowBack /> : <IoArrowForward />
  return (
    <article className="group">
      <Link href={`/${item?.slug?.[locale as "ar" | "en"]}`} className="block" scroll={true}>
        <figure className="relative w-full">
          <Image
            src={item.image}
            width={540}
            height={379}
            alt={item.title}
            className="w-full object-cover h-auto lg:rounded-xl lg:group-hover:scale-105 lg:transition-transform lg:duration-200"
          />
        </figure>
        <div className="space-y-3 mt-4 lg:space-y-5 lg:relative lg:z-10 lg:mx-auto max-w-full lg:max-w-[96%] lg:p-6 lg:bg-background lg:-mt-20 lg:rounded-xl ">
          <h3 className="text-primary min-h-14 font-medium text-lg">
            {item.title}
          </h3>
          <p className="text-muted-foreground">{item.short_description}</p>

          <div className="flex justify-end pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              className="bg-secondary border-none w-[48px] h-[48px] rounded-xl"
            >
              {ArrowComponent}
            </Button>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default BlogItem
