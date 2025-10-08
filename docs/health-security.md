# Health & Security

Monitor API health and implement security best practices.

## Health Check

**Endpoint:** `GET /health`

Check if the API is running and healthy.

### Request

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/health
\`\`\`

### Response

\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-08T12:00:00.000Z",
  "uptime": 86400,
  "database": "connected",
  "activeSessions": 5
}
\`\`\`

### Python Example

\`\`\`python
import requests

response = requests.get('https://codeskytz-api-lajj0.sevalla.app/health')
health = response.json()

if health['status'] == 'ok':
    print('API is healthy')
    print(f"Active sessions: {health['activeSessions']}")
else:
    print('API is down!')
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/health')
  .then(res => res.json())
  .then(health => {
    if (health.status === 'ok') {
      console.log('API is healthy');
      console.log(`Active sessions: ${health.activeSessions}`);
    } else {
      console.log('API is down!');
    }
  });
\`\`\`

## Detailed Status

**Endpoint:** `GET /status`

Get detailed system status including database and session information.

### Request

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/status
\`\`\`

### Response

\`\`\`json
{
  "api": {
    "status": "running",
    "version": "1.0.0",
    "uptime": 86400
  },
  "database": {
    "status": "connected",
    "latency": 5
  },
  "sessions": {
    "total": 10,
    "connected": 5,
    "pending": 2,
    "disconnected": 3
  },
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Security Best Practices

### 1. API Authentication

Implement API key authentication for production:

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/sessions \
  -H "X-API-Key: your-api-key"
\`\`\`

### 2. Rate Limiting

The API implements rate limiting to prevent abuse:

- **Default limits:**
  - 100 requests per minute per IP
  - 1000 requests per hour per session

### 3. Webhook Security

Always use webhook secrets to verify authenticity:

\`\`\`python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
\`\`\`

### 4. HTTPS Only

Always use HTTPS for API requests. HTTP requests will be rejected.

### 5. Environment Variables

Never hardcode sensitive data. Use environment variables:

\`\`\`bash
export DATABASE_URL="postgresql://..."
export API_SECRET_KEY="your-secret-key"
export WEBHOOK_SECRET="webhook-secret"
\`\`\`

### 6. Input Validation

The API validates all inputs:
- Phone numbers must be in E.164 format
- URLs must be valid and accessible
- Message content is sanitized

### 7. Session Isolation

Each session is isolated and cannot access other sessions' data.

## Monitoring

### Log Levels

Configure logging levels:

\`\`\`bash
export LOG_LEVEL="info"  # debug, info, warn, error
\`\`\`

### Metrics Endpoint

**Endpoint:** `GET /metrics`

Get API metrics (requires authentication):

\`\`\`json
{
  "requests": {
    "total": 10000,
    "success": 9500,
    "errors": 500
  },
  "messages": {
    "sent": 5000,
    "received": 3000,
    "failed": 100
  },
  "sessions": {
    "created": 50,
    "active": 30,
    "deleted": 20
  }
}
\`\`\`

## Error Handling

### Standard Error Response

\`\`\`json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `SESSION_NOT_FOUND` | Session does not exist | 404 |
| `INVALID_PHONE` | Invalid phone number format | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `UNAUTHORIZED` | Missing or invalid API key | 401 |
| `DATABASE_ERROR` | Database connection issue | 500 |
| `WEBHOOK_FAILED` | Webhook delivery failed | 500 |

## Backup & Recovery

### Database Backups

Regular PostgreSQL backups are recommended:

\`\`\`bash
pg_dump $DATABASE_URL > backup.sql
\`\`\`

### Session Recovery

Sessions are automatically recovered on server restart if database is intact.
