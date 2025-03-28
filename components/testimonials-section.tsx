"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

const testimonials = [
  {
    id: 1,
    quote:
      "We've worked with several carriers over the years, but none have provided the level of service and attention to detail that TruckingPro offers. Their team is responsive, and their drivers are professional.",
    name: "Jane Smith",
    initials: "JS",
    position: "Supply Chain Director, XYZ Retail",
  },
  {
    id: 2,
    quote:
      "TruckingPro has been our go-to carrier for the past 5 years. Their reliability and professionalism are unmatched in the industry. Our shipments always arrive on time and in perfect condition.",
    name: "John Doe",
    initials: "JD",
    position: "Logistics Manager, ABC Manufacturing",
  },
  {
    id: 3,
    quote:
      "The customer service at TruckingPro is exceptional. They're always available to answer questions and provide updates on our shipments. I highly recommend their services to any business looking for reliable transportation.",
    name: "Robert Johnson",
    initials: "RJ",
    position: "Operations Director, Global Foods Inc.",
  },
  {
    id: 4,
    quote:
      "Since partnering with TruckingPro, we've seen a significant improvement in our logistics efficiency. Their advanced tracking systems and professional drivers ensure our products reach customers safely and on time.",
    name: "Emily Chen",
    initials: "EC",
    position: "VP of Distribution, Tech Solutions Ltd.",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (autoplay) startAutoplay()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoplay])

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-70 hover:opacity-100 ${
              isDark ? "bg-background/50 hover:bg-background/80" : ""
            }`}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <div className="overflow-hidden px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-none shadow-none bg-transparent ${isDark ? "text-foreground" : ""}`}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <blockquote className="text-lg md:text-xl italic mb-6 max-w-3xl mx-auto">
                        "{testimonials[activeIndex].quote}"
                      </blockquote>
                      <div className="flex flex-col items-center">
                        <Avatar className="h-12 w-12 mb-4">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {testimonials[activeIndex].initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonials[activeIndex].name}</p>
                          <p className="text-sm text-muted-foreground">{testimonials[activeIndex].position}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-70 hover:opacity-100 ${
              isDark ? "bg-background/50 hover:bg-background/80" : ""
            }`}
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary scale-100"
                    : `${isDark ? "bg-muted-foreground/40" : "bg-muted-foreground/30"} scale-75 hover:scale-90`
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

