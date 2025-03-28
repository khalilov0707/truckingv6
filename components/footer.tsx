"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Function to handle copying text to clipboard
  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
      } else {
        setPhoneCopied(true)
        setTimeout(() => setPhoneCopied(false), 2000)
      }

      toast({
        title: "Copied to clipboard",
        description: `${text} has been copied to your clipboard.`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
    })
  }

  // Function to handle opening maps
  const openInMaps = () => {
    const address = "123 Logistics Way, Trucking City, TX 75001"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com?q=${encodedAddress}`, "_blank")
  }

  // Function to handle social media links
  const handleSocialClick = (platform: string) => {
    // In a real implementation, these would be actual social media URLs
    const socialUrls: Record<string, string> = {
      facebook: "https://facebook.com/uscargosolutions",
      instagram: "https://instagram.com/uscargosolutions",
      linkedin: "https://linkedin.com/company/uscargosolutions",
      twitter: "https://twitter.com/uscargosolutions",
    }

    window.open(socialUrls[platform], "_blank")

    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to our ${platform} page.`,
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    })
  }

  return (
    <footer
      id="contact"
      className={`${isDark ? "bg-muted/20" : "bg-muted/50"} border-t transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="space-y-4" variants={item}>
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">US CARGO SOLUTIONS LLC</span>
            </div>
            <p className="text-muted-foreground">
              Professional trucking and logistics solutions for businesses across the United States.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("facebook")}
                className={`${
                  isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                } hover:text-primary transition-colors`}
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </button>
              <button
                onClick={() => handleSocialClick("instagram")}
                className={`${
                  isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                } hover:text-primary transition-colors`}
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </button>
              <button
                onClick={() => handleSocialClick("linkedin")}
                className={`${
                  isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                } hover:text-primary transition-colors`}
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </button>
              <button
                onClick={() => handleSocialClick("twitter")}
                className={`${
                  isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                } hover:text-primary transition-colors`}
                aria-label="Visit our Twitter page"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </button>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#partners"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#partners")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#fleet"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#fleet")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#testimonials")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                    toast({
                      title: "Full Truckload Service",
                      description: "Learn more about our full truckload shipping services.",
                      action: <ToastAction altText="View Details">View Details</ToastAction>,
                    })
                  }}
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group text-left w-full`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Full Truckload
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                    toast({
                      title: "Expedited Shipping",
                      description: "Learn more about our expedited shipping services.",
                      action: <ToastAction altText="View Details">View Details</ToastAction>,
                    })
                  }}
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group text-left w-full`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Expedited Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                    toast({
                      title: "Specialized Freight",
                      description: "Learn more about our specialized freight services.",
                      action: <ToastAction altText="View Details">View Details</ToastAction>,
                    })
                  }}
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group text-left w-full`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Specialized Freight
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                    toast({
                      title: "Refrigerated Transport",
                      description: "Learn more about our refrigerated transport services.",
                      action: <ToastAction altText="View Details">View Details</ToastAction>,
                    })
                  }}
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group text-left w-full`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Refrigerated Transport
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                    toast({
                      title: "Flatbed Services",
                      description: "Learn more about our flatbed shipping services.",
                      action: <ToastAction altText="View Details">View Details</ToastAction>,
                    })
                  }}
                  className={`${
                    isDark ? "text-muted-foreground/80" : "text-muted-foreground"
                  } hover:text-primary transition-colors flex items-center group text-left w-full`}
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Flatbed Services
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <button
                  onClick={() => copyToClipboard("(555) 123-4567", "phone")}
                  className="flex items-start group w-full text-left"
                  aria-label="Copy phone number to clipboard"
                >
                  <Phone className="h-5 w-5 mr-2 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-primary transition-colors">
                    (555) 123-4567
                    {phoneCopied && <span className="ml-2 text-xs text-green-500">Copied!</span>}
                  </span>
                </button>
              </li>
              <li className="flex items-start group">
                <button
                  onClick={() => copyToClipboard("info@uscargosolutions.com", "email")}
                  className="flex items-start group w-full text-left"
                  aria-label="Copy email to clipboard"
                >
                  <Mail className="h-5 w-5 mr-2 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-primary transition-colors">
                    info@uscargosolutions.com
                    {emailCopied && <span className="ml-2 text-xs text-green-500">Copied!</span>}
                  </span>
                </button>
              </li>
              <li className="flex items-start group">
                <button
                  onClick={openInMaps}
                  className="flex items-start group w-full text-left"
                  aria-label="Open location in Google Maps"
                >
                  <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="group-hover:text-primary transition-colors">
                    <p>123 Logistics Way</p>
                    <p>Trucking City, TX 75001</p>
                    <p className="flex items-center mt-1 text-sm text-primary">
                      <span>View on Maps</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </p>
                  </div>
                </button>
              </li>
            </ul>
            <div className="mt-6">
              <Button
                asChild
                className={`group ${isDark ? "bg-primary/90 hover:bg-primary" : ""}`}
                onClick={() => document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Link href="#quote">
                  <span>Get a Quote</span>
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div
          className={`border-t mt-12 pt-6 text-center text-sm ${
            isDark ? "text-muted-foreground/70 border-muted/20" : "text-muted-foreground"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} US CARGO SOLUTIONS LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

