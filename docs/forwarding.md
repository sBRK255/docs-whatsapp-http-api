# Message Forwarding

Forward messages between WhatsApp contacts or groups.

## Forward a Message

**Endpoint:** `POST /sessions/:id/forward-message`

Forward an existing message to another contact.

### Request Body

\`\`\`json
{
  "messageId": "3EB0C767D0F2B64C7C5B",
  "to": "+9876543210"
}
\`\`\`

### cURL Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward-message \
  -H "Content-Type: application/json" \
  -d '{
    "messageId": "3EB0C767D0F2B64C7C5B",
    "to": "+9876543210"
  }'
\`\`\`

### Python Example

\`\`\`python
import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward-message"
payload = {
    "messageId": "3EB0C767D0F2B64C7C5B",
    "to": "+9876543210"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messageId: '3EB0C767D0F2B64C7C5B',
    to: '+9876543210'
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
  "forwardedMessageId": "4FC1D878E1G3C75D8D6C",
  "originalMessageId": "3EB0C767D0F2B64C7C5B",
  "to": "+9876543210",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Forward to Multiple Recipients

**Endpoint:** `POST /sessions/:id/forward-message-bulk`

Forward a message to multiple contacts at once.

### Request Body

\`\`\`json
{
  "messageId": "3EB0C767D0F2B64C7C5B",
  "recipients": ["+9876543210", "+1122334455", "+5566778899"]
}
\`\`\`

### Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/forward-message-bulk \
  -H "Content-Type: application/json" \
  -d '{
    "messageId": "3EB0C767D0F2B64C7C5B",
    "recipients": ["+9876543210", "+1122334455", "+5566778899"]
  }'
\`\`\`

### Response

\`\`\`json
{
  "success": true,
  "originalMessageId": "3EB0C767D0F2B64C7C5B",
  "forwards": [
    {
      "to": "+9876543210",
      "messageId": "4FC1D878E1G3C75D8D6C",
      "status": "sent"
    },
    {
      "to": "+1122334455",
      "messageId": "5GD2E989F2H4D86E9E7D",
      "status": "sent"
    },
    {
      "to": "+5566778899",
      "messageId": "6HE3F090G3I5E97F0F8E",
      "status": "sent"
    }
  ],
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Forward with Caption

Add a new caption when forwarding media messages:

\`\`\`json
{
  "messageId": "3EB0C767D0F2B64C7C5B",
  "to": "+9876543210",
  "caption": "Check this out!"
}
\`\`\`

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `messageId` | string | Yes | ID of the message to forward |
| `to` | string | Yes* | Recipient phone number (E.164 format) |
| `recipients` | array | Yes* | Array of recipient phone numbers (bulk forward) |
| `caption` | string | No | New caption for media messages |

*Either `to` or `recipients` is required, not both.

## Supported Message Types

The following message types can be forwarded:

- ✅ Text messages
- ✅ Images
- ✅ Videos
- ✅ Audio files
- ✅ Documents
- ✅ Stickers
- ❌ Live location (not supported)
- ❌ Contact cards (not supported)

## Rate Limiting

To prevent spam, bulk forwarding is limited to:
- Maximum 50 recipients per request
- Maximum 100 forwards per minute per session

## Error Responses

### Message Not Found

\`\`\`json
{
  "error": "Message not found",
  "messageId": "invalid-id"
}
\`\`\`

### Invalid Recipient

\`\`\`json
{
  "error": "Invalid recipient phone number",
  "to": "invalid-number"
}
