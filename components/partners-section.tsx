"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

// Import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const partners = [
  {
    id: "power-dat",
    name: "Power DAT",
    logo: "/images/partners/power-dat.png",
  },
  {
    id: "ups",
    name: "UPS",
    logo: "/images/partners/ups.png",
  },
  {
    id: "fedex",
    name: "FedEx",
    logo: "/images/partners/fedex.png",
  },
  {
    id: "walmart",
    name: "Walmart",
    logo: "/images/partners/walmart.png",
  },
  {
    id: "costco",
    name: "Costco",
    logo: "/images/partners/costco.png",
  },
]

export default function PartnersSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isMounted, setIsMounted] = useState(false)
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const paginationRef = useRef(null)

  // After mounting, we can safely show the Swiper
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section id="partners" className="py-16 md:py-24 bg-muted/30 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Partners
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We work with leading companies across various industries to provide reliable logistics solutions.
          </motion.p>
        </div>

        <div className="relative px-10 md:px-16">
          {/* Custom navigation arrows */}
          <button
            ref={navigationPrevRef}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full ${
              isDark
                ? "bg-background/80 text-foreground hover:bg-background"
                : "bg-white text-primary/80 hover:text-primary shadow-md"
            } transition-all duration-300`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            ref={navigationNextRef}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full ${
              isDark
                ? "bg-background/80 text-foreground hover:bg-background"
                : "bg-white text-primary/80 hover:text-primary shadow-md"
            } transition-all duration-300`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Swiper carousel */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              bulletClass: `w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer inline-block ${
                isDark ? "bg-gray-600" : "bg-gray-300"
              }`,
              bulletActiveClass: `${isDark ? "bg-primary" : "bg-primary"}`,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current
              // @ts-ignore
              swiper.params.pagination.el = paginationRef.current
            }}
            breakpoints={{
              // Mobile
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // Tablet
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // Desktop
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="partners-swiper"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div
                  className={`h-40 flex items-center justify-center p-6 rounded-xl ${
                    isDark ? "bg-background/80 border border-primary/10" : "bg-white"
                  } shadow-lg transition-transform duration-300 hover:scale-105`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination */}
          <div ref={paginationRef} className="flex justify-center mt-8 space-x-2"></div>
        </div>
      </div>
    </section>
  )
}

