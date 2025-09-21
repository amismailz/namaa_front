"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/pagination"
import { useLocale } from "next-intl"

const slides = [
  { src: "/clients/1.png" },
  { src: "/clients/2.png" },
  { src: "/clients/3.png" },
  { src: "/clients/4.png" },
  { src: "/clients/5.png" },
  { src: "/clients/6.png" }
]

const CientSlider2 = () => {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"
  
  return (
    
    <div className="relative mt-3">
      <Swiper
        dir={dir} // ✅ RTL mode
        modules={[Pagination, Autoplay]}
        slidesPerView={6} // ✅ Show 6 items
        spaceBetween={12} // ✅ Gap between slides
        loop={true} // ✅ Infinite loop
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
        {slides.map(({ src }, index) => (
          <SwiperSlide key={index}>
            <div className="flex aspect-square items-center justify-center">
              <div className="flex items-center justify-center p-6 bg-background rounded-xl border border-black/5">
                <Image
                  src={src}
                  alt={`client logo image ${index}`}
                  width={160}
                  height={140}
                />
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
