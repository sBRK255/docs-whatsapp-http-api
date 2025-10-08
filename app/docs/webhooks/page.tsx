import { CodeBlock } from "@/components/code-block"

export default function WebhooksPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Webhooks</h1>

      <h2>Configure Webhook</h2>
      <p>
        <strong>Endpoint:</strong> <code>POST /sessions/:id/webhook</code>
      </p>

      <h3>Request Body</h3>
      <CodeBlock
        language="json"
        code={`{
  "url": "https://your-server.com/webhook"
}`}
      />

      <h3>cURL Example</h3>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/:id/webhook \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://your-server.com/webhook"}'`}
      />

      <h2>Webhook Payload</h2>
      <p>When a message is received, your webhook URL will receive:</p>
      <CodeBlock
        language="json"
        code={`{
  "sessionId": ":id",
  "from": "+1234567890",
  "message": "Hello!",
  "timestamp": "2025-01-08T12:00:00Z"
}`}
      />
    </div>
  )
}
