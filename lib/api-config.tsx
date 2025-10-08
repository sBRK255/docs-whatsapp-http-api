"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ApiConfigContextType {
  baseUrl: string
  updateBaseUrl: (url: string) => void
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined)

const DEFAULT_BASE_URL = "https://codeskytz-api-lajj0.sevalla.app"

export function ApiConfigProvider({ children }: { children: ReactNode }) {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL)

  useEffect(() => {
    // Load base URL from localStorage on mount
    const stored = localStorage.getItem("api_base_url")
    if (stored) {
      setBaseUrl(stored)
    }
  }, [])

  const updateBaseUrl = (url: string) => {
    setBaseUrl(url)
    localStorage.setItem("api_base_url", url)
  }

  return <ApiConfigContext.Provider value={{ baseUrl, updateBaseUrl }}>{children}</ApiConfigContext.Provider>
}

export function useApiConfig() {
  const context = useContext(ApiConfigContext)
  if (context === undefined) {
    throw new Error("useApiConfig must be used within an ApiConfigProvider")
  }
  return context
}
