import { CodeBlock } from "@/components/code-block"

export default function ForwardingPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Message Forwarding</h1>

      <h2>Forward Message</h2>
      <p>
        <strong>Endpoint:</strong> <code>POST /sessions/:id/forward</code>
      </p>

      <h3>Request Body</h3>
      <CodeBlock
        language="json"
        code={`{
  "messageId": "msg_123456",
  "to": "+1234567890"
}`}
      />

      <h3>cURL Example</h3>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward \\
  -H "Content-Type: application/json" \\
  -d '{"messageId":"msg_123456","to":"+1234567890"}'`}
      />

      <h3>Python Example</h3>
      <CodeBlock
        language="python"
        code={`import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward"
payload = {"messageId": "msg_123456", "to": "+1234567890"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}
      />
    </div>
  )
}
