"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import { useLocale } from "next-intl"
import { ClientItemType } from "@/types.type"
import "swiper/css"
import "swiper/css/pagination"
import { useEffect, useState } from "react"

const CientSlider2 = ({ data }: { data: ClientItemType[] }) => {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    // This code ONLY runs on the client after successful hydration.
    // Therefore, if it runs, JavaScript is enabled.
    setIsJSEnabled(true);
  }, []);


  if (!isJSEnabled) {
    return <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
      {data.map(({ image, title }, index) => (
        <div key={index} className="flex  items-center justify-center">
          <div className="flex items-center justify-center p-6 bg-background rounded-xl border border-black/5">
            <Image src={image} alt={title} width={160} height={140} />
          </div>
        </div>
      ))}
    </div>
  }

  return (
    <div className="relative mt-3">
      <Swiper
        dir={dir} // ✅ RTL mode
        modules={[Pagination, Autoplay]}
        slidesPerView={6} // ✅ Show 6 items
        spaceBetween={12} // ✅ Gap between slides
        loop={true} // ✅ Infinite loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        breakpoints={{
          0: {
            slidesPerView: 2 // ✅ Mobile
          },
          568: {
            slidesPerView: 3 // ✅ Tablet1
          },
          768: {
            slidesPerView: 4 // ✅ Tablet2
          },
          1024: {
            slidesPerView: 6 // ✅ Desktop
          }
        }}
        className="w-full client-slider"
      >
        {data.map(({ image, title }, index) => (
          <SwiperSlide key={index}>
            <div className="flex aspect-square items-center justify-center">
              <div className="flex items-center justify-center p-6 bg-background rounded-xl border border-black/5">
                <Image src={image} alt={title} width={160} height={140} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Place pagination outside with any spacing you like */}
      <div className="custom-pagination mt-3 gap-0 flex justify-center items-center" />
    </div>
  )
}

export default CientSlider2
