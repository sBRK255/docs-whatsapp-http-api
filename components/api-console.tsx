"use client"

import { useState } from "react"
import { useApiConfig } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Play, Trash2, Copy, Check, Maximize2, Minimize2, Maximize } from "lucide-react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

interface ConsoleResponse {
  timestamp: string
  method: string
  url: string
  status?: number
  response?: string
  error?: string
}

export function ApiConsole() {
  const { baseUrl } = useApiConfig()
  const [method, setMethod] = useState("POST")
  const [endpoint, setEndpoint] = useState("/sessions/:id/send-message")
  const [body, setBody] = useState('{\n  "to": "+1234567890",\n  "message": "Hello from API"\n}')
  const [includeBody, setIncludeBody] = useState(true)
  const [responses, setResponses] = useState<ConsoleResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [requestCollapsed, setRequestCollapsed] = useState(false)
  const [responseCollapsed, setResponseCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const executeRequest = async () => {
    setLoading(true)
    const timestamp = new Date().toLocaleTimeString()
    const fullUrl = `${baseUrl}${endpoint}`

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method,
          endpoint,
          body: includeBody ? body : undefined,
          baseUrl,
        }),
      })

      const result = await response.json()

      if (result.error) {
        setResponses((prev) => [
          {
            timestamp,
            method,
            url: fullUrl,
            error: result.error,
          },
          ...prev,
        ])
      } else {
        setResponses((prev) => [
          {
            timestamp,
            method,
            url: fullUrl,
            status: result.status,
            response: result.data,
          },
          ...prev,
        ])
      }
    } catch (error) {
      setResponses((prev) => [
        {
          timestamp,
          method,
          url: fullUrl,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ])
    } finally {
      setLoading(false)
    }
  }

  const clearResponses = () => {
    setResponses([])
  }

  const copyResponse = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "w-full"}>
      <div className="flex justify-end mb-2">
        <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)} className="gap-2">
          {isFullscreen ? (
            <>
              <Minimize2 className="h-4 w-4" />
              Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize className="h-4 w-4" />
              Fullscreen
            </>
          )}
        </Button>
      </div>

      <div className="hidden lg:block">
        <ResizablePanelGroup
          direction="horizontal"
          className={`rounded-lg border ${isFullscreen ? "h-[calc(100vh-8rem)]" : "min-h-[600px]"}`}
        >
          <ResizablePanel
            defaultSize={35}
            minSize={20}
            maxSize={80}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setRequestCollapsed(true)}
            onExpand={() => setRequestCollapsed(false)}
          >
            <Card className="flex flex-col h-full border-0 rounded-none">
              <div className="border-b bg-muted/50 px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold">Request</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRequestCollapsed(!requestCollapsed)}
                  className="h-8 w-8 p-0"
                  title={requestCollapsed ? "Show request" : "Hide request"}
                >
                  {requestCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-3 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="px-3 py-2 border rounded-md bg-background w-full sm:w-32"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <Input
                      value={endpoint}
                      onChange={(e) => setEndpoint(e.target.value)}
                      placeholder="/endpoint"
                      className="flex-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Base URL</Label>
                    <Input value={baseUrl} disabled className="font-mono text-xs" />
                  </div>

                  <div className="flex items-center justify-between p-2.5 border rounded-md">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-body" className="text-sm font-medium">
                        Include Request Body
                      </Label>
                      <p className="text-xs text-muted-foreground">Enable to send a JSON body with your request</p>
                    </div>
                    <Switch id="include-body" checked={includeBody} onCheckedChange={setIncludeBody} />
                  </div>

                  {includeBody && (
                    <div className="space-y-2">
                      <Label className="text-sm">Request Body (JSON)</Label>
                      <Textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="font-mono text-xs min-h-32"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={executeRequest} disabled={loading} className="gap-2">
                      <Play className="h-4 w-4" />
                      {loading ? "Executing..." : "Execute"}
                    </Button>
                    <Button onClick={clearResponses} variant="outline" className="gap-2 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel
            defaultSize={65}
            minSize={20}
            maxSize={80}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setResponseCollapsed(true)}
            onExpand={() => setResponseCollapsed(false)}
          >
            <Card className="flex flex-col h-full border-0 rounded-none">
              <div className="border-b bg-muted/50 px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold">Response</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResponseCollapsed(!responseCollapsed)}
                  className="h-8 w-8 p-0"
                  title={responseCollapsed ? "Show response" : "Hide response"}
                >
                  {responseCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
              </div>
              <ScrollArea className="flex-1">
                {responses.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground p-4">
                    No responses yet. Execute a request to see results.
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {responses.map((resp, index) => (
                      <Card key={index} className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-muted-foreground">{resp.timestamp}</span>
                              <span className="px-2 py-0.5 text-xs font-mono bg-muted rounded">{resp.method}</span>
                              {resp.status && (
                                <span
                                  className={`px-2 py-0.5 text-xs font-mono rounded ${
                                    resp.status >= 200 && resp.status < 300
                                      ? "bg-green-500/10 text-green-500"
                                      : "bg-red-500/10 text-red-500"
                                  }`}
                                >
                                  {resp.status}
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-mono break-all">{resp.url}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyResponse(index, resp.response || resp.error || "")}
                            className="shrink-0"
                          >
                            {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        {resp.response && (
                          <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                            <code>{resp.response}</code>
                          </pre>
                        )}
                        {resp.error && (
                          <pre className="text-xs bg-red-500/10 text-red-500 p-3 rounded overflow-x-auto">
                            <code>{resp.error}</code>
                          </pre>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden grid grid-cols-1 gap-4">
        <Card className="flex flex-col">
          <div className="border-b bg-muted/50 px-4 py-3">
            <h3 className="font-semibold">Request</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background w-full sm:w-32"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <Input
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/endpoint"
                className="flex-1"
              />
            </div>

            <div className="space-y-2">
              <Label>Base URL</Label>
              <Input value={baseUrl} disabled className="font-mono text-sm" />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="include-body-mobile" className="text-sm font-medium">
                  Include Request Body
                </Label>
                <p className="text-xs text-muted-foreground">Enable to send a JSON body with your request</p>
              </div>
              <Switch id="include-body-mobile" checked={includeBody} onCheckedChange={setIncludeBody} />
            </div>

            {includeBody && (
              <div className="space-y-2">
                <Label>Request Body (JSON)</Label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="font-mono text-sm min-h-32"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={executeRequest} disabled={loading} className="gap-2">
                <Play className="h-4 w-4" />
                {loading ? "Executing..." : "Execute"}
              </Button>
              <Button onClick={clearResponses} variant="outline" className="gap-2 bg-transparent">
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="border-b bg-muted/50 px-4 py-3">
            <h3 className="font-semibold">Response</h3>
          </div>
          <ScrollArea className="h-[400px]">
            {responses.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground p-4">
                No responses yet. Execute a request to see results.
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {responses.map((resp, index) => (
                  <Card key={index} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-muted-foreground">{resp.timestamp}</span>
                          <span className="px-2 py-0.5 text-xs font-mono bg-muted rounded">{resp.method}</span>
                          {resp.status && (
                            <span
                              className={`px-2 py-0.5 text-xs font-mono rounded ${
                                resp.status >= 200 && resp.status < 300
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {resp.status}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-mono break-all">{resp.url}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyResponse(index, resp.response || resp.error || "")}
                        className="shrink-0"
                      >
                        {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {resp.response && (
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                        <code>{resp.response}</code>
                      </pre>
                    )}
                    {resp.error && (
                      <pre className="text-xs bg-red-500/10 text-red-500 p-3 rounded overflow-x-auto">
                        <code>{resp.error}</code>
                      </pre>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
