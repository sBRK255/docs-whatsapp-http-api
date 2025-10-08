import type React from "react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"

const navigation = [
  { title: "Introduction", href: "/docs/intro" },
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Session Management", href: "/docs/session-management" },
  { title: "Send Messages", href: "/docs/send-message" },
  { title: "Status Broadcast", href: "/docs/status-broadcast" },
  { title: "Incoming Messages", href: "/docs/incoming-messages" },
  { title: "Webhooks", href: "/docs/webhooks" },
  { title: "Forwarding", href: "/docs/forwarding" },
  { title: "Database Schema", href: "/docs/db-schema" },
  { title: "Health & Security", href: "/docs/health-security" },
  { title: "Deployment", href: "/docs/deployment" },
  { title: "API Console", href: "/docs/console" },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2 font-bold">
              WhatsApp API
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <ScrollArea className="h-full">
              <nav className="p-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container max-w-4xl py-6 px-4 sm:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
