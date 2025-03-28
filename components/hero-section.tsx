"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isMounted, setIsMounted] = useState(false)

  // After mounting, we can safely show the video
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {isMounted && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="https://video.wixstatic.com/video/0f3452_ea3d07c6f3024c1c898f778b13e44ee3/1080p/mp4/file.mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
            US CARGO SOLUTIONS LLC
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Professional carrier services with nationwide coverage. On-time delivery, competitive rates, and exceptional
            customer service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="relative overflow-hidden group bg-primary/90 hover:bg-primary text-white border-2 border-transparent"
            >
              <Link href="#quote">
                <span className="relative z-10">Request a Quote →</span>
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group bg-transparent border-2 border-white text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="#services">
                <span>Explore Services</span>
                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">✓</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

