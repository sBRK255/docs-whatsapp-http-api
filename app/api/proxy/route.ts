import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { method, endpoint, body, baseUrl } = await request.json()

    const url = `${baseUrl}${endpoint}`

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (method !== "GET" && body) {
      options.body = body
    }

    console.log("[v0] Proxying request:", { method, url })

    const response = await fetch(url, options)
    const data = await response.text()

    console.log("[v0] Response status:", response.status)

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data,
    })
  } catch (error) {
    console.error("[v0] Proxy error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch from API",
      },
      { status: 500 },
    )
  }
}
