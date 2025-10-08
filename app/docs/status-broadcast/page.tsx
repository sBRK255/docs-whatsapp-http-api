import { CodeBlock } from "@/components/code-block"

export default function StatusBroadcastPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Status Broadcast</h1>

      <p>
        <strong>Endpoint:</strong> <code>POST /sessions/:id/send-status</code>
      </p>

      <h2>Request Body</h2>
      <CodeBlock
        language="json"
        code={`{
  "message": "Check out our new product!"
}`}
      />

      <h2>cURL Example</h2>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-status \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Check out our new product!"}'`}
      />

      <h2>Python Example</h2>
      <CodeBlock
        language="python"
        code={`import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-status"
payload = {"message": "Check out our new product!"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}
      />
    </div>
  )
}
