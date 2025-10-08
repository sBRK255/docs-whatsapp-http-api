# Deployment

Deploy the WhatsApp HTTP API to production.

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## Environment Variables

Create a `.env` file with the following variables:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Server
PORT=3000
NODE_ENV=production

# Security
API_SECRET_KEY=your-secret-key-here
WEBHOOK_SECRET=your-webhook-secret

# Optional
LOG_LEVEL=info
MAX_SESSIONS=100
\`\`\`

## Deployment Options

### Option 1: Traditional Server (VPS)

#### 1. Install Dependencies

\`\`\`bash
npm install --production
\`\`\`

#### 2. Set Up Database

\`\`\`bash
psql $DATABASE_URL < schema.sql
\`\`\`

#### 3. Use Process Manager (PM2)

\`\`\`bash
npm install -g pm2

# Start the application
pm2 start index.js --name whatsapp-api

# Enable startup on boot
pm2 startup
pm2 save
\`\`\`

#### 4. Configure Nginx (Reverse Proxy)

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

#### 5. Enable SSL with Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
\`\`\`

### Option 2: Docker

#### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
\`\`\`

#### docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/whatsapp
      - NODE_ENV=production
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=whatsapp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
\`\`\`

#### Deploy with Docker

\`\`\`bash
docker-compose up -d
\`\`\`

### Option 3: Cloud Platforms

#### Heroku

\`\`\`bash
# Install Heroku CLI
heroku login

# Create app
heroku create whatsapp-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# Set environment variables
heroku config:set API_SECRET_KEY=your-secret
\`\`\`

#### Railway

1. Connect your GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically on push

#### DigitalOcean App Platform

1. Create new app from GitHub
2. Add managed PostgreSQL database
3. Configure environment variables
4. Deploy

#### AWS (EC2 + RDS)

1. Launch EC2 instance (Ubuntu 22.04)
2. Create RDS PostgreSQL instance
3. Configure security groups
4. Deploy using PM2 + Nginx

## Production Checklist

### Security

- [ ] Enable HTTPS/SSL
- [ ] Set strong `API_SECRET_KEY`
- [ ] Configure webhook secrets
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Use environment variables (never commit secrets)

### Database

- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Enable SSL for database connections
- [ ] Set up monitoring and alerts

### Monitoring

- [ ] Set up application logging
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Set up uptime monitoring
- [ ] Configure alerts for failures

### Performance

- [ ] Enable response compression
- [ ] Configure caching where appropriate
- [ ] Optimize database queries
- [ ] Set up CDN for static assets (if any)

### Backup & Recovery

- [ ] Automated database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Set up redundancy (if needed)

## Scaling

### Horizontal Scaling

Use a load balancer with multiple instances:

\`\`\`nginx
upstream whatsapp_api {
    server api1.example.com:3000;
    server api2.example.com:3000;
    server api3.example.com:3000;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://whatsapp_api;
    }
}
\`\`\`

### Database Scaling

- Use connection pooling
- Consider read replicas for heavy read workloads
- Implement caching (Redis) for frequently accessed data

## Monitoring & Logs

### View Logs (PM2)

\`\`\`bash
pm2 logs whatsapp-api
\`\`\`

### View Logs (Docker)

\`\`\`bash
docker-compose logs -f api
\`\`\`

### Health Check Monitoring

Set up a cron job or monitoring service to check `/health` endpoint:

\`\`\`bash
*/5 * * * * curl -f https://your-domain.com/health || echo "API is down!"
\`\`\`

## Troubleshooting

### API Not Starting

1. Check logs for errors
2. Verify database connection
3. Ensure all environment variables are set
4. Check port availability

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check database server is running
3. Verify network connectivity
4. Check PostgreSQL logs

### Session Connection Problems

1. Check WhatsApp Web status
2. Verify QR code generation
3. Check session status in database
4. Review application logs

## Support

For issues and questions:
- GitHub Issues: https://github.com/sirtheprogrammer/whatsapp-http-api/issues
- Documentation: https://codeskytz-api-lajj0.sevalla.app/docs
