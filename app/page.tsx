import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Rocket, Smartphone, Bell } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Easy to Use",
      icon: Rocket,
      description:
        "Simple REST API endpoints for WhatsApp automation. Send messages, manage sessions, and handle webhooks with ease.",
    },
    {
      title: "Multi-Session Support",
      icon: Smartphone,
      description: "Manage multiple WhatsApp sessions simultaneously. Perfect for businesses and automation workflows.",
    },
    {
      title: "Real-time Webhooks",
      icon: Bell,
      description:
        "Receive instant notifications for incoming messages and events. Build responsive WhatsApp bots and integrations.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            WhatsApp HTTP API
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">WhatsApp HTTP API</h1>
          <p className="text-xl mb-8 text-green-50">REST API wrapper around Baileys for WhatsApp automation</p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs/intro">Get Started →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <a href="https://github.com/sirtheprogrammer/whatsapp-http-api" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="h-10 w-10 mb-2 text-green-600" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Start</h2>
            <Card>
              <CardHeader>
                <CardTitle>Base API URL</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="block bg-muted p-4 rounded-md text-sm">https://codeskytz-api-lajj0.sevalla.app</code>
                <div className="mt-6 flex gap-2">
                  <img
                    src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white"
                    alt="Node.js"
                  />
                  <img src="https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express" alt="Express" />
                  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql" alt="PostgreSQL" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>MIT © 2025 — SirTheProgrammer</p>
        </div>
      </footer>
    </div>
  )
}
