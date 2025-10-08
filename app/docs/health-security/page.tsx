export default function HealthSecurityPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Health & Security</h1>

      <h2>Health Check</h2>
      <p>
        <strong>Endpoint:</strong> <code>GET /health</code>
      </p>

      <h3>cURL Example</h3>
      <pre>
        <code className="language-bash">{`curl https://codeskytz-api-lajj0.sevalla.app/health`}</code>
      </pre>

      <h3>Response</h3>
      <pre>
        <code className="language-json">{`{
  "status": "ok",
  "uptime": 123456,
  "timestamp": "2025-01-08T12:00:00Z"
}`}</code>
      </pre>

      <h2>Security Best Practices</h2>
      <ul>
        <li>Always use HTTPS for API requests</li>
        <li>Store session IDs securely</li>
        <li>Implement rate limiting on your end</li>
        <li>Validate webhook signatures</li>
        <li>Use environment variables for sensitive data</li>
        <li>Regularly rotate API credentials</li>
      </ul>

      <h2>Rate Limits</h2>
      <p>The API implements the following rate limits:</p>
      <ul>
        <li>100 requests per minute per session</li>
        <li>1000 requests per hour per IP</li>
      </ul>
    </div>
  )
}
