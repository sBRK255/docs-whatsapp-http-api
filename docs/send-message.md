# Send Messages

Send text messages to WhatsApp contacts through the API.

## Send a Text Message

**Endpoint:** `POST /sessions/:id/send-message`

Send a text message to a WhatsApp number.

### Request Body

\`\`\`json
{
  "to": "+1234567890",
  "message": "Hello from API"
}
\`\`\`

### cURL Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message \
  -H "Content-Type: application/json" \
  -d '{"to":"+1234567890","message":"Hello from API"}'
\`\`\`

### Python Example

\`\`\`python
import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message"
payload = {
    "to": "+1234567890",
    "message": "Hello from API"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: '+1234567890',
    message: 'Hello from API'
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
\`\`\`

### Response

\`\`\`json
{
  "success": true,
  "messageId": "3EB0C767D0F2B64C7C5B",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Send Message with Media

**Endpoint:** `POST /sessions/:id/send-media`

Send images, videos, or documents.

### Request Body

\`\`\`json
{
  "to": "+1234567890",
  "mediaUrl": "https://example.com/image.jpg",
  "caption": "Check out this image!",
  "mediaType": "image"
}
\`\`\`

### Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-media \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "mediaUrl": "https://example.com/image.jpg",
    "caption": "Check out this image!",
    "mediaType": "image"
  }'
\`\`\`

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | string | Yes | Recipient phone number (E.164 format) |
| `message` | string | Yes | Message text content |
| `mediaUrl` | string | No | URL of media file (for media messages) |
| `caption` | string | No | Caption for media messages |
| `mediaType` | string | No | Type: `image`, `video`, `document`, `audio` |

## Error Responses

### Invalid Session

\`\`\`json
{
  "error": "Session not found",
  "sessionId": "invalid-id"
}
\`\`\`

### Invalid Phone Number

\`\`\`json
{
  "error": "Invalid phone number format",
  "to": "invalid-number"
}
