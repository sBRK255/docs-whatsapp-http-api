# Status Broadcast

Send WhatsApp status updates (stories) through the API.

## Send Status Update

**Endpoint:** `POST /sessions/:id/send-status`

Broadcast a status update to your WhatsApp contacts.

### Request Body

\`\`\`json
{
  "message": "Hello from my status!",
  "mediaUrl": "https://example.com/image.jpg",
  "mediaType": "image"
}
\`\`\`

### cURL Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-status \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello from my status!",
    "mediaUrl": "https://example.com/image.jpg",
    "mediaType": "image"
  }'
\`\`\`

### Python Example

\`\`\`python
import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-status"
payload = {
    "message": "Hello from my status!",
    "mediaUrl": "https://example.com/image.jpg",
    "mediaType": "image"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/send-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello from my status!',
    mediaUrl: 'https://example.com/image.jpg',
    mediaType: 'image'
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
  "statusId": "STATUS_3EB0C767D0F2B64C7C5B",
  "timestamp": "2025-01-08T12:00:00.000Z",
  "expiresAt": "2025-01-09T12:00:00.000Z"
}
\`\`\`

## Text-Only Status

Send a text-only status update:

\`\`\`json
{
  "message": "Just a text status update!"
}
\`\`\`

## Media Status Types

| Type | Description | Supported Formats |
|------|-------------|-------------------|
| `image` | Image status | JPG, PNG, WebP |
| `video` | Video status | MP4, 3GP |

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | No | Status text content |
| `mediaUrl` | string | No | URL of media file |
| `mediaType` | string | No | Type: `image` or `video` |
| `backgroundColor` | string | No | Background color for text status (hex) |

## Notes

- Status updates expire after 24 hours
- At least one of `message` or `mediaUrl` must be provided
- Media files should be publicly accessible URLs
- Maximum video duration: 30 seconds
