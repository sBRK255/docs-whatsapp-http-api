import { CodeBlock } from "@/components/code-block"

export default function SessionManagementPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Session Management</h1>

      <h2>Create Session</h2>
      <p>
        <strong>Endpoint:</strong> <code>POST /sessions</code>
      </p>

      <h3>cURL Example</h3>
      <CodeBlock
        language="bash"
        code={`curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions \\
  -H "Content-Type: application/json"`}
      />

      <h2>Get All Sessions</h2>
      <p>
        <strong>Endpoint:</strong> <code>GET /sessions</code>
      </p>

      <h3>cURL Example</h3>
      <CodeBlock language="bash" code={`curl https://codeskytz-api-lajj0.sevalla.app/sessions`} />

      <h2>Delete Session</h2>
      <p>
        <strong>Endpoint:</strong> <code>DELETE /sessions/:id</code>
      </p>

      <h3>cURL Example</h3>
      <CodeBlock language="bash" code={`curl -X DELETE https://codeskytz-api-lajj0.sevalla.app/sessions/:id`} />
    </div>
  )
}
