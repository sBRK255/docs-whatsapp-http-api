export default function DbSchemaPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Database Schema</h1>

      <h2>Sessions Table</h2>
      <pre>
        <code className="language-sql">{`CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20),
  status VARCHAR(20),
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}</code>
      </pre>

      <h2>Messages Table</h2>
      <pre>
        <code className="language-sql">{`CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  from_number VARCHAR(20),
  to_number VARCHAR(20),
  message TEXT,
  message_type VARCHAR(20),
  timestamp TIMESTAMP DEFAULT NOW()
);`}</code>
      </pre>

      <h2>Webhooks Table</h2>
      <pre>
        <code className="language-sql">{`CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`}</code>
      </pre>
    </div>
  )
}
