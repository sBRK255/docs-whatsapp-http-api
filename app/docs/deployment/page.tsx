export default function DeploymentPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Deployment</h1>

      <h2>Environment Variables</h2>
      <pre>
        <code className="language-bash">{`DATABASE_URL=postgresql://user:pass@host:5432/dbname
PORT=3000
NODE_ENV=production`}</code>
      </pre>

      <h2>Docker Deployment</h2>
      <pre>
        <code className="language-dockerfile">{`FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]`}</code>
      </pre>

      <h3>Build and Run</h3>
      <pre>
        <code className="language-bash">{`docker build -t whatsapp-api .
docker run -p 3000:3000 --env-file .env whatsapp-api`}</code>
      </pre>

      <h2>Production Checklist</h2>
      <ul>
        <li>✅ Set up SSL/TLS certificates</li>
        <li>✅ Configure database backups</li>
        <li>✅ Set up monitoring and logging</li>
        <li>✅ Implement rate limiting</li>
        <li>✅ Configure firewall rules</li>
        <li>✅ Set up health checks</li>
        <li>✅ Document API endpoints</li>
      </ul>

      <h2>Monitoring</h2>
      <p>Monitor these key metrics:</p>
      <ul>
        <li>API response times</li>
        <li>Error rates</li>
        <li>Active sessions</li>
        <li>Message throughput</li>
        <li>Database connections</li>
      </ul>
    </div>
  )
}
