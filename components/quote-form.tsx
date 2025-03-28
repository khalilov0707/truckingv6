"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function QuoteForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section
      id="quote"
      className={`py-16 md:py-24 ${
        isDark ? "bg-muted/20" : "bg-muted/30"
      } relative overflow-hidden transition-colors duration-300`}
    >
      {/* Background decoration */}
      <div
        className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full ${
          isDark ? "bg-primary/10" : "bg-primary/5"
        } blur-3xl transition-colors duration-300`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full ${
          isDark ? "bg-primary/10" : "bg-primary/5"
        } blur-3xl transition-colors duration-300`}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Quote</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below to get a custom quote for your shipping needs.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className={`max-w-2xl mx-auto ${isDark ? "border-primary/10" : ""}`}>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
              <CardDescription>Provide information about your shipment for an accurate quote.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className={isDark ? "bg-background/50" : ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." required className={isDark ? "bg-background/50" : ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className={isDark ? "bg-background/50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      required
                      className={isDark ? "bg-background/50" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select>
                    <SelectTrigger id="service-type" className={isDark ? "bg-background/50" : ""}>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-truckload">Full Truckload</SelectItem>
                      <SelectItem value="less-than-truckload">Less Than Truckload</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated Freight</SelectItem>
                      <SelectItem value="hazmat">Hazmat Freight</SelectItem>
                      <SelectItem value="expedited">Expedited Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin Location</Label>
                    <Input
                      id="origin"
                      placeholder="City, State"
                      required
                      className={isDark ? "bg-background/50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="City, State"
                      required
                      className={isDark ? "bg-background/50" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                          isDark && "bg-background/50",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Please provide any additional information about your shipment (weight, dimensions, special requirements, etc.)"
                    rows={4}
                    className={isDark ? "bg-background/50" : ""}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className={`w-full relative overflow-hidden group ${isDark ? "bg-primary/90 hover:bg-primary" : ""}`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <span className="relative z-10">{isSubmitting ? "Submitting..." : "Request Quote"}</span>
                <span
                  className={`absolute inset-0 ${
                    isDark ? "bg-primary/40" : "bg-primary/20"
                  } transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                ></span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {isSuccess && (
          <motion.div
            className={`mt-6 p-4 ${
              isDark ? "bg-green-900/50 text-green-100" : "bg-green-100 text-green-800"
            } rounded-md text-center flex items-center justify-center gap-2`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle2 className="h-5 w-5" />
            Thank you for your request! We'll get back to you with a quote shortly.
          </motion.div>
        )}
      </div>
    </section>
  )
}

