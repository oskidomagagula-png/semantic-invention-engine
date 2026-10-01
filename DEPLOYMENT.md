# Semantic Invention Engine - Deployment & Setup Guide

## Local Development

### Quick Start

**Linux/macOS:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

This will:
1. Check Node.js installation
2. Install dependencies
3. Start backend API on `http://localhost:3001`
4. Start frontend UI on `http://localhost:5173`

### Manual Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start both servers
npm run dev

# Or start separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

---

## Docker Deployment (Local)

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

**Access:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### Build Individual Images

```bash
# Backend
docker build -f Dockerfile.server -t semantic-invention-engine:server .
docker run -p 3001:3001 semantic-invention-engine:server

# Frontend
docker build -f Dockerfile.client -t semantic-invention-engine:client .
docker run -p 5173:5173 semantic-invention-engine:client
```

---

## Cloud Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Connect repository to Vercel: https://vercel.com/new
3. Configure environment:
   ```
   VITE_API_BASE_URL=<your-backend-url>
   ```
4. Deploy

### Railway (Full Stack)

1. Push code to GitHub
2. Create new Railway project: https://railway.app
3. Add services:
   - **Node.js Backend**: Set start command to `npm run server`
   - **Node.js Frontend**: Set build command to `npm run build` and start command to `npm run preview`
4. Set environment variables for each service
5. Deploy

### Heroku (Backend)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create semantic-invention-engine-api

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### AWS (Lambda + S3 + CloudFront)

**Backend (Lambda):**
```bash
# Zip server code
zip -r lambda.zip server.js src/ node_modules/

# Upload to AWS Lambda
# Function handler: server.handler
```

**Frontend (S3 + CloudFront):**
```bash
# Build
npm run build

# Upload dist/ to S3
aws s3 sync dist/ s3://your-bucket-name/

# Setup CloudFront distribution pointing to S3
```

### Google Cloud Run

```bash
# Build and deploy backend
gcloud run deploy semantic-invention-engine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Get the service URL
# Update VITE_API_BASE_URL in frontend .env
```

---

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3001
```

---

## Health Checks

**Backend:**
```bash
curl http://localhost:3001/api/health
```

**Response:**
```json
{ "status": "ok", "timestamp": "2026-10-01T19:50:00.000Z" }
```

---

## Troubleshooting

### Port Already in Use
```bash
# Linux/macOS - Kill process on port
lsof -i :3001
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### CORS Issues
- Ensure `VITE_API_BASE_URL` matches your backend URL
- Backend CORS is configured for `http://localhost:*`

### API Connection Failed
- Verify backend is running: `curl http://localhost:3001/api/health`
- Check firewall settings
- Verify `.env` configuration

---

## Performance Optimization

### Frontend
```bash
npm run build
```

Production build output in `dist/` directory.

### Backend
- Use Node.js clustering for multi-core systems
- Add Redis caching for semantic mining results
- Implement request rate limiting

---

## Monitoring

### Local
```bash
# View backend logs
npm run server

# View frontend logs
npm run client
```

### Cloud
- **Vercel**: Dashboard → Deployments → Logs
- **Railway**: Dashboard → Service → Logs
- **Heroku**: `heroku logs --tail`
- **AWS**: CloudWatch Logs
- **Google Cloud**: Cloud Logging

---

## Next Steps

1. Set up CI/CD pipeline (GitHub Actions)
2. Add automated testing
3. Configure custom domain
4. Set up SSL/TLS certificates
5. Add monitoring and alerting
6. Implement database for idea persistence

