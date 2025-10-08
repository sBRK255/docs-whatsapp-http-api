"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="hidden md:block">
          <ResizablePanelGroup direction="horizontal">
            {!sidebarCollapsed && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="relative">
                  <aside className="h-full border-r bg-muted/40">
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
                          <Link
                            href="/admin"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors border-t mt-2 pt-3"
                          >
                            <Settings className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        </nav>
                      </ScrollArea>
                    </div>
                  </aside>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(true)}
                    className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            <ResizablePanel defaultSize={sidebarCollapsed ? 100 : 80}>
              <div className="relative h-full">
                {sidebarCollapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(false)}
                    className="absolute top-2 left-2 h-8 w-8 p-0 z-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                <main className="h-full overflow-auto">
                  <div className="container max-w-4xl py-6 px-4 sm:py-8">{children}</div>
                </main>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile layout - unchanged */}
        <div className="md:hidden flex-1">
          <main className="h-full">
            <div className="container max-w-4xl py-6 px-4 sm:py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
