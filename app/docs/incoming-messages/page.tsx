import { CodeBlock } from "@/components/code-block"

export default function IncomingMessagesPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Incoming Messages</h1>

      <h2>Get Messages</h2>
      <p>
        <strong>Endpoint:</strong> <code>GET /sessions/:id/messages</code>
      </p>

      <h3>cURL Example</h3>
      <CodeBlock
        language="bash"
        code={`curl https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages`}
      />

      <h3>Python Example</h3>
      <CodeBlock
        language="python"
        code={`import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages"
response = requests.get(url)
print(response.json())`}
      />

      <h3>JavaScript Example</h3>
      <CodeBlock
        language="javascript"
        code={`fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)`}
      />
    </div>
  )
}
