import { CodeBlock } from "@/components/code-block"

export default function SendMessagePage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Send Messages</h1>

      <p>
        <strong>Endpoint:</strong> <code>POST /sessions/:id/send-message</code>
      </p>

      <h2>Request Body</h2>
      <CodeBlock
        language="json"
        code={`{
  "to": "+1234567890",
  "message": "Hello from API"
}`}
      />

      <h2>cURL Example</h2>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message \\
  -H "Content-Type: application/json" \\
  -d '{"to":"+1234567890","message":"Hello from API"}'`}
      />

      <h2>Python Example</h2>
      <CodeBlock
        language="python"
        code={`import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message"
payload = {"to": "+1234567890", "message": "Hello from API"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}
      />

      <h2>JavaScript Example</h2>
      <CodeBlock
        language="javascript"
        code={`fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ to: '+1234567890', message: 'Hello from API' })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)`}
      />
    </div>
  )
}
