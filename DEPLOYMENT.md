# Lune E-Commerce Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- MongoDB database
- Vercel account (for frontend)
- Render/Railway account (for backend)

## Backend Deployment (Render)

### 1. Prepare Backend

\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: lune-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Set Environment Variables

In Render dashboard, add:
- `DATABASE_URL`: Your PostgreSQL connection string
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Generate a secure random string
- `PORT`: 5000

### 4. Deploy

Push to GitHub and Render will auto-deploy.

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

\`\`\`bash
cd frontend
npm install
npm run build
\`\`\`

### 2. Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 3. Set Environment Variables

In Vercel dashboard, add:
- `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., https://lune-backend.onrender.com/api)

### 4. Deploy

\`\`\`bash
vercel --prod
\`\`\`

## Database Setup

### PostgreSQL (Render)

1. Create a PostgreSQL database on Render
2. Get connection string
3. Run migrations:

\`\`\`bash
psql -U user -d lune_db -f backend/scripts/init-db.sql
\`\`\`

### MongoDB (MongoDB Atlas)

1. Create cluster on [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to environment variables

## Testing Deployment

1. Test backend health:
   \`\`\`
   curl https://your-backend-url/api/health
   \`\`\`

2. Test frontend:
   - Visit your Vercel deployment URL
   - Register a new account
   - Add products (admin)
   - Test checkout flow

## Troubleshooting

### Backend won't start
- Check environment variables are set
- Verify database connections
- Check logs in Render dashboard

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

### Database connection errors
- Verify connection strings
- Check database credentials
- Ensure IP whitelist allows your server

## Production Checklist

- [ ] Environment variables set in all services
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Error logging configured
- [ ] Monitoring alerts set up
- [ ] Database indexes created
- [ ] Tests passing
- [ ] Documentation updated
