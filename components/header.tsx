"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { motion } from "framer-motion"

// Remove 'Home' and 'About' from the navigation items
const navItems = [
  { name: "Services", href: "#services" },
  { name: "Partners", href: "#partners" },
  { name: "Fleet", href: "#fleet" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
        setIsAtTop(false)
      } else {
        setScrolled(false)
        setIsAtTop(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")

    // Add a class to the body for transition effects
    document.documentElement.classList.add("dark-mode-transition")

    // Remove the class after the transition completes
    setTimeout(() => {
      document.documentElement.classList.remove("dark-mode-transition")
    }, 500)
  }

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
      }
    }
  }

  if (!mounted) {
    return null
  }

  // Determine the appropriate theme toggle button styling
  const getThemeToggleStyles = () => {
    if (isAtTop) {
      return "border-white/30 text-white hover:bg-white/20 hover:text-white"
    }

    if (theme === "dark") {
      return "border-primary/20 bg-background/80 text-primary hover:bg-background hover:text-primary/80"
    }

    // Light mode styling
    return "border border-gray-200 bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 hover:border-gray-300"
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Truck
              className={`h-6 w-6 ${isAtTop ? "text-white" : "text-primary"} group-hover:text-primary/80 transition-colors`}
            />
          </motion.div>
          {/* Replace "TruckingPro" with "US CARGO SOLUTIONS LLC" in the logo text */}
          <span
            className={`font-bold text-xl ${isAtTop ? "text-white" : ""} group-hover:text-primary/80 transition-colors`}
          >
            US CARGO SOLUTIONS LLC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium ${
                isAtTop ? "text-white/90 hover:text-white" : "hover:text-primary"
              } transition-colors relative group`}
              onClick={(e) => handleAnchorClick(e, item.href)}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isAtTop ? "bg-white" : "bg-primary"
                } transition-all duration-300 group-hover:w-full`}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Desktop Theme Toggle Button */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={`relative overflow-hidden rounded-full w-10 h-10 transition-all duration-300 ${getThemeToggleStyles()}`}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {/* Sun/Moon icons with animation */}
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "dark" ? -40 : 0,
                    opacity: theme === "dark" ? 0 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <MoonIcon className="h-5 w-5" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "dark" ? 0 : 40,
                    opacity: theme === "dark" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SunIcon className="h-5 w-5" />
                </motion.div>
              </div>
            </Button>

            {/* Tooltip for better UX */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-background/90 text-foreground px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
              {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </div>
          </div>

          <Button
            asChild
            className={`relative overflow-hidden group ${
              isAtTop ? "bg-white/20 hover:bg-white/30 text-white border-2 border-white/60" : "bg-primary text-white"
            }`}
          >
            <Link href="#quote">
              <span className="relative z-10">Get a Quote →</span>
              <span
                className={`absolute inset-0 ${
                  isAtTop ? "bg-white/20" : "bg-primary/20"
                } transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
              ></span>
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`relative overflow-hidden rounded-full w-9 h-9 transition-all duration-300 ${getThemeToggleStyles()}`}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Sun/Moon icons with animation for mobile */}
              <motion.div
                initial={false}
                animate={{
                  y: theme === "dark" ? -40 : 0,
                  opacity: theme === "dark" ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <MoonIcon className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  y: theme === "dark" ? 0 : 40,
                  opacity: theme === "dark" ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SunIcon className="h-4 w-4" />
              </motion.div>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isAtTop ? "text-white hover:bg-white/20" : ""}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background border-b"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={(e) => handleAnchorClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link href="#quote" onClick={() => setIsMenuOpen(false)}>
                Get a Quote →
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

