import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IntroPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>WhatsApp HTTP API</h1>
      <p className="lead">A small but powerful Node.js REST API that wraps the Baileys WhatsApp client.</p>

      <div className="not-prose my-6">
        <p className="font-semibold mb-2">Base API URL:</p>
        <code className="block bg-muted p-4 rounded-md text-sm">https://codeskytz-api-lajj0.sevalla.app</code>
      </div>

      <div className="flex gap-2 my-6 not-prose">
        <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white" alt="Node.js" />
        <img src="https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express" alt="Express" />
        <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql" alt="PostgreSQL" />
      </div>

      <div className="not-prose my-8">
        <Button asChild>
          <Link href="/docs/getting-started">Get Started →</Link>
        </Button>
      </div>
    </div>
  )
}
