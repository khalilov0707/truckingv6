"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add a class to the body when the theme changes to enable transitions
  React.useEffect(() => {
    const handleThemeChange = () => {
      document.documentElement.classList.add("dark-mode-transition")
      setTimeout(() => {
        document.documentElement.classList.remove("dark-mode-transition")
      }, 500)
    }

    // Listen for theme changes
    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("themeChange", handleThemeChange)
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

