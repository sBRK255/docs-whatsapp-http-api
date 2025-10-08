# Getting Started

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- npm or yarn package manager

## Installation

### 1. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure database

Set your PostgreSQL connection string as an environment variable:

\`\`\`bash
export DATABASE_URL="postgresql://user:pass@host:5432/dbname"
\`\`\`

Or create a `.env` file:

\`\`\`env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
PORT=3000
\`\`\`

### 3. Start the server

\`\`\`bash
node index.js
\`\`\`

The server will start at `https://codeskytz-api-lajj0.sevalla.app` (or your configured URL).

## Verify Installation

Check if the API is running:

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/health
\`\`\`

Expected response:

\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Next Steps

- [Create a WhatsApp session](session-management.md)
- [Send your first message](send-message.md)
- [Configure webhooks](webhooks.md)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port (default: 3000) | No |
| `WEBHOOK_URL` | Default webhook URL for incoming messages | No |
