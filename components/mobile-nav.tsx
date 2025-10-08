"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"

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

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex items-center gap-2 px-4 py-4 border-b font-bold">WhatsApp API</div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
