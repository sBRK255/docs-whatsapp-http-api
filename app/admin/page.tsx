"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useApiConfig } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Save, RotateCcw, CheckCircle2, Lock, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { baseUrl, updateBaseUrl } = useApiConfig()
  const [newUrl, setNewUrl] = useState(baseUrl)
  const [saved, setSaved] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    setNewUrl(baseUrl)
  }, [baseUrl])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "codeskytz123") {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      setError("")
      setPassword("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
  }

  const handleSave = () => {
    updateBaseUrl(newUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    const defaultUrl = "https://codeskytz-api-lajj0.sevalla.app"
    setNewUrl(defaultUrl)
    updateBaseUrl(defaultUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>

          <p className="text-center text-muted-foreground">
            Enter the admin password to access the configuration panel.
          </p>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Lock className="h-4 w-4" />
              Login
            </Button>
          </form>

          <div className="text-center">
            <Link href="/docs/intro">
              <Button variant="link">Back to Documentation</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Link href="/docs/intro">
              <Button variant="outline">Back to Docs</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">API Configuration</h2>
            <p className="text-muted-foreground">
              Update the base URL for the API. This will be used throughout the console and documentation.
            </p>
          </div>

          {saved && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                Base URL updated successfully! Changes will apply immediately.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-url">Base URL</Label>
              <Input
                id="base-url"
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://api.example.com"
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">Enter the full base URL including protocol (https://)</p>
            </div>

            <div className="space-y-2">
              <Label>Current Base URL</Label>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">{baseUrl}</div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Reset to Default
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <h3 className="font-semibold">Where is this used?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>API Console for testing endpoints</li>
              <li>All API proxy requests</li>
              <li>Documentation examples (future)</li>
            </ul>
          </div>
        </Card>
      </main>
    </div>
  )
}
