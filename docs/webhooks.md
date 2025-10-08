# Webhooks

Configure webhooks to receive real-time notifications for incoming messages and events.

## Configure Webhook

**Endpoint:** `POST /sessions/:id/webhook`

Set up a webhook URL for a session to receive incoming messages.

### Request Body

\`\`\`json
{
  "webhookUrl": "https://your-server.com/webhook",
  "events": ["message", "status", "connection"]
}
\`\`\`

### cURL Example

\`\`\`bash
curl -X POST https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-server.com/webhook",
    "events": ["message", "status", "connection"]
  }'
\`\`\`

### Python Example

\`\`\`python
import requests

url = "https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/webhook"
payload = {
    "webhookUrl": "https://your-server.com/webhook",
    "events": ["message", "status", "connection"]
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
\`\`\`

### JavaScript Example

\`\`\`javascript
fetch('https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    webhookUrl: 'https://your-server.com/webhook',
    events: ['message', 'status', 'connection']
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
\`\`\`

## Webhook Events

### Message Event

Triggered when a new message is received.

\`\`\`json
{
  "event": "message",
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "messageId": "3EB0C767D0F2B64C7C5B",
  "from": "+1234567890",
  "message": "Hello!",
  "type": "text",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

### Status Event

Triggered when message status changes (sent, delivered, read).

\`\`\`json
{
  "event": "status",
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "messageId": "3EB0C767D0F2B64C7C5B",
  "status": "read",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

### Connection Event

Triggered when session connection status changes.

\`\`\`json
{
  "event": "connection",
  "sessionId": "408f7372-f7c9-4299-a8db-326bc5548a73",
  "status": "connected",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
\`\`\`

## Webhook Server Examples

### Python (Flask)

\`\`\`python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    event = data.get('event')
    
    if event == 'message':
        print(f"New message from {data['from']}: {data['message']}")
        # Process message
        
    elif event == 'status':
        print(f"Message {data['messageId']} status: {data['status']}")
        # Handle status update
        
    elif event == 'connection':
        print(f"Connection status: {data['status']}")
        # Handle connection change
    
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
\`\`\`

### Node.js (Express)

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { event, sessionId } = req.body;
  
  switch(event) {
    case 'message':
      console.log(`New message from ${req.body.from}: ${req.body.message}`);
      // Process message
      break;
      
    case 'status':
      console.log(`Message ${req.body.messageId} status: ${req.body.status}`);
      // Handle status update
      break;
      
    case 'connection':
      console.log(`Connection status: ${req.body.status}`);
      // Handle connection change
      break;
  }
  
  res.json({ status: 'received' });
});

app.listen(5000, () => {
  console.log('Webhook server running on port 5000');
});
\`\`\`

## Security

### Verify Webhook Signature

Add a secret key to verify webhook authenticity:

\`\`\`json
{
  "webhookUrl": "https://your-server.com/webhook",
  "secret": "your-secret-key"
}
\`\`\`

The API will include an `X-Webhook-Signature` header with HMAC-SHA256 signature.

### Python Verification

\`\`\`python
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_signature(payload, signature, 'your-secret-key'):
        return jsonify({"error": "Invalid signature"}), 401
    
    # Process webhook
    return jsonify({"status": "received"}), 200
\`\`\`

## Remove Webhook

**Endpoint:** `DELETE /sessions/:id/webhook`

\`\`\`bash
curl -X DELETE https://codeskytz-api-lajj0.sevalla.app/sessions/408f7372-f7c9-4299-a8db-326bc5548a73/webhook
