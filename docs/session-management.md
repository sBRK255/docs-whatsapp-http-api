# Session Management

Manage WhatsApp sessions through the API. Each session represents a WhatsApp connection.

## Create a New Session

**Endpoint:** `POST /sessions`

Creates a new WhatsApp session and returns a QR code for authentication.

### Request

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions \
  -H "Content-Type: application/json"
\`\`\`

### Response

\`\`\`json
{
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "qrCode": "data:image/png;base64,iVBORw0KG...",
  "status": "pending"
}
\`\`\`

### Python Example

\`\`\`python
import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions"
headers = {"Content-Type": "application/json"}

response = requests.post(url, headers=headers)
data = response.json()

print(f"Session ID: {data['sessionId']}")
print(f"QR Code: {data['qrCode']}")
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.json())
  .then(data => {
    console.log('Session ID:', data.sessionId);
    console.log('QR Code:', data.qrCode);
  })
  .catch(console.error);
\`\`\`

## Get Session Status

**Endpoint:** `GET /sessions/:id`

Check the status of a WhatsApp session.

### Request

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73
\`\`\`

### Response

\`\`\`json
{
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "status": "connected",
  "phoneNumber": "+1234567890",
  "connectedAt": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Delete Session

**Endpoint:** `DELETE /sessions/:id`

Disconnect and delete a WhatsApp session.

### Request

\`\`\`bash
curl -X DELETE https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73
\`\`\`

### Response

\`\`\`json
{
  "message": "Session deleted successfully",
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73"
}
\`\`\`

## List All Sessions

**Endpoint:** `GET /sessions`

Get a list of all active sessions.

### Request

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/sessions
\`\`\`

### Response

\`\`\`json
{
  "sessions": [
    {
      "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
      "status": "connected",
      "phoneNumber": "+1234567890"
    }
  ]
}
