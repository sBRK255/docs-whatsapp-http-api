import { ApiConsole } from "@/components/api-console"
import { Terminal } from "lucide-react"

export default function ConsolePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          <h1 className="text-3xl font-bold">API Console</h1>
        </div>
        <p className="text-muted-foreground">
          Test API endpoints directly from your browser. Execute requests and see responses in real-time.
        </p>
      </div>

      <ApiConsole />

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <h2>Quick Start</h2>
        <ol>
          <li>Select the HTTP method (GET, POST, PUT, DELETE)</li>
          <li>Enter the endpoint path (e.g., /sessions/:id/send-message)</li>
          <li>Add request body for POST/PUT requests</li>
          <li>Click Execute to send the request</li>
          <li>View the response in the Response tab</li>
        </ol>

        <h2>Example Endpoints</h2>
        <ul>
          <li>
            <code>POST /sessions/:id/send-message</code> - Send a message
          </li>
          <li>
            <code>GET /sessions/:id/status</code> - Check session status
          </li>
          <li>
            <code>POST /sessions/create</code> - Create new session
          </li>
          <li>
            <code>DELETE /sessions/:id</code> - Delete session
          </li>
        </ul>
      </div>
    </div>
  )
}
