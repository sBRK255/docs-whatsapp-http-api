# Incoming Messages

Handle incoming WhatsApp messages through webhooks or polling.

## Webhook Method (Recommended)

Configure a webhook URL to receive incoming messages in real-time.

### Set Webhook URL

**Endpoint:** `POST /sessions/:id/webhook`

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/webhook \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl": "https://your-server.com/webhook"}'
\`\`\`

### Webhook Payload

When a message is received, the API will POST to your webhook URL:

\`\`\`json
{
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "messageId": "3EB0C767D0F2B64C7C5B",
  "from": "+1234567890",
  "message": "Hello!",
  "timestamp": "2025-01-08T12:00:00.000Z",
  "type": "text"
}
\`\`\`

### Handle Webhook in Python

\`\`\`python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    
    print(f"Message from {data['from']}: {data['message']}")
    
    # Process the message
    # ...
    
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(port=5000)
\`\`\`

### Handle Webhook in JavaScript (Express)

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { from, message, messageId } = req.body;
  
  console.log(`Message from ${from}: ${message}`);
  
  // Process the message
  // ...
  
  res.json({ status: 'received' });
});

app.listen(5000, () => {
  console.log('Webhook server running on port 5000');
});
\`\`\`

## Polling Method

**Endpoint:** `GET /sessions/:id/messages`

Retrieve unread messages by polling.

### Request

\`\`\`bash
curl https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages
\`\`\`

### Response

\`\`\`json
{
  "messages": [
    {
      "messageId": "3EB0C767D0F2B64C7C5B",
      "from": "+1234567890",
      "message": "Hello!",
      "timestamp": "2025-01-08T12:00:00.000Z",
      "type": "text",
      "read": false
    }
  ]
}
\`\`\`

### Python Polling Example

\`\`\`python
import requests
import time

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages"

while True:
    response = requests.get(url)
    data = response.json()
    
    for msg in data['messages']:
        if not msg['read']:
            print(f"New message from {msg['from']}: {msg['message']}")
    
    time.sleep(5)  # Poll every 5 seconds
\`\`\`

## Message Types

| Type | Description | Additional Fields |
|------|-------------|-------------------|
| `text` | Text message | `message` |
| `image` | Image message | `mediaUrl`, `caption` |
| `video` | Video message | `mediaUrl`, `caption` |
| `audio` | Audio message | `mediaUrl` |
| `document` | Document message | `mediaUrl`, `filename` |

## Mark Message as Read

**Endpoint:** `POST /sessions/:id/messages/:messageId/read`

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/messages/3EB0C767D0F2B64C7C5B/read
