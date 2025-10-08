export default function GettingStartedPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Getting Started</h1>

      <h2>Install dependencies</h2>
      <pre>
        <code className="language-bash">{`npm install`}</code>
      </pre>

      <h2>Configure database</h2>
      <pre>
        <code className="language-bash">{`export DATABASE_URL="postgresql://user:pass@host:5432/dbname"`}</code>
      </pre>

      <h2>Start server</h2>
      <pre>
        <code className="language-bash">{`node index.js`}</code>
      </pre>

      <p>
        Server runs at <code>https://codeskytz-api-lajj0.sevalla.app</code>
      </p>
    </div>
  )
}
