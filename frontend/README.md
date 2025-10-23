# Lune E-Commerce Frontend

Modern Next.js frontend for Lune skincare e-commerce platform.

## Technology Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS v4
- Client-side cart management
- JWT authentication

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables in `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
npm start
\`\`\`

## Features

- Product catalog with search and filtering
- Server-side sorting by price, name, and date
- Shopping cart with local storage persistence
- User authentication (register/login)
- Order management and history
- Admin dashboard for product management
- Reports dashboard with analytics
- Minimalist, responsive design
- Mobile-friendly navigation

## Deployment

Deploy to Vercel:
\`\`\`bash
vercel deploy
\`\`\`

Set environment variables in Vercel dashboard:
- \`NEXT_PUBLIC_API_URL\` - Backend API URL
