# Database Schema

PostgreSQL database schema used by the WhatsApp HTTP API.

## Tables

### sessions

Stores WhatsApp session information.

\`\`\`sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  qr_code TEXT,
  webhook_url TEXT,
  webhook_secret VARCHAR(255),
  webhook_events TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  connected_at TIMESTAMP,
  last_seen TIMESTAMP
);

CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_sessions_status ON sessions(status);
\`\`\`

#### Columns

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `session_id` | VARCHAR(255) | Unique session identifier |
| `phone_number` | VARCHAR(20) | Connected WhatsApp number |
| `status` | VARCHAR(50) | Session status: `pending`, `connected`, `disconnected` |
| `qr_code` | TEXT | Base64 encoded QR code for authentication |
| `webhook_url` | TEXT | Webhook URL for events |
| `webhook_secret` | VARCHAR(255) | Secret for webhook signature verification |
| `webhook_events` | TEXT[] | Array of subscribed events |
| `created_at` | TIMESTAMP | Session creation time |
| `updated_at` | TIMESTAMP | Last update time |
| `connected_at` | TIMESTAMP | Time when session connected |
| `last_seen` | TIMESTAMP | Last activity timestamp |

### messages

Stores incoming and outgoing messages.

\`\`\`sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  message_id VARCHAR(255) UNIQUE NOT NULL,
  from_number VARCHAR(20) NOT NULL,
  to_number VARCHAR(20) NOT NULL,
  message_text TEXT,
  message_type VARCHAR(50) NOT NULL DEFAULT 'text',
  media_url TEXT,
  media_type VARCHAR(50),
  caption TEXT,
  direction VARCHAR(10) NOT NULL,
  status VARCHAR(50) DEFAULT 'sent',
  read BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_message_id ON messages(message_id);
CREATE INDEX idx_messages_from_number ON messages(from_number);
CREATE INDEX idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX idx_messages_read ON messages(read) WHERE read = FALSE;
\`\`\`

#### Columns

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `session_id` | VARCHAR(255) | Reference to session |
| `message_id` | VARCHAR(255) | WhatsApp message ID |
| `from_number` | VARCHAR(20) | Sender phone number |
| `to_number` | VARCHAR(20) | Recipient phone number |
| `message_text` | TEXT | Message content |
| `message_type` | VARCHAR(50) | Type: `text`, `image`, `video`, `audio`, `document` |
| `media_url` | TEXT | URL of media file |
| `media_type` | VARCHAR(50) | MIME type of media |
| `caption` | TEXT | Media caption |
| `direction` | VARCHAR(10) | `incoming` or `outgoing` |
| `status` | VARCHAR(50) | Message status: `sent`, `delivered`, `read`, `failed` |
| `read` | BOOLEAN | Whether message has been read |
| `timestamp` | TIMESTAMP | Message timestamp |
| `created_at` | TIMESTAMP | Record creation time |

### status_broadcasts

Stores WhatsApp status updates.

\`\`\`sql
CREATE TABLE status_broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  status_id VARCHAR(255) UNIQUE NOT NULL,
  message_text TEXT,
  media_url TEXT,
  media_type VARCHAR(50),
  background_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

CREATE INDEX idx_status_session_id ON status_broadcasts(session_id);
CREATE INDEX idx_status_expires_at ON status_broadcasts(expires_at);
\`\`\`

## Setup Script

Run this SQL script to create all tables:

\`\`\`sql
-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  qr_code TEXT,
  webhook_url TEXT,
  webhook_secret VARCHAR(255),
  webhook_events TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  connected_at TIMESTAMP,
  last_seen TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  message_id VARCHAR(255) UNIQUE NOT NULL,
  from_number VARCHAR(20) NOT NULL,
  to_number VARCHAR(20) NOT NULL,
  message_text TEXT,
  message_type VARCHAR(50) NOT NULL DEFAULT 'text',
  media_url TEXT,
  media_type VARCHAR(50),
  caption TEXT,
  direction VARCHAR(10) NOT NULL,
  status VARCHAR(50) DEFAULT 'sent',
  read BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_message_id ON messages(message_id);
CREATE INDEX IF NOT EXISTS idx_messages_from_number ON messages(from_number);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read) WHERE read = FALSE;

-- Create status_broadcasts table
CREATE TABLE IF NOT EXISTS status_broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) NOT NULL,
  status_id VARCHAR(255) UNIQUE NOT NULL,
  message_text TEXT,
  media_url TEXT,
  media_type VARCHAR(50),
  background_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_status_session_id ON status_broadcasts(session_id);
CREATE INDEX IF NOT EXISTS idx_status_expires_at ON status_broadcasts(expires_at);
\`\`\`

## Migrations

For production deployments, use a migration tool like:
- [node-pg-migrate](https://github.com/salsita/node-pg-migrate)
- [Knex.js](https://knexjs.org/)
- [Prisma](https://www.prisma.io/)
