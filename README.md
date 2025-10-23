# Lune E-Commerce Platform

A production-ready full-stack e-commerce application for Lune skincare brand, built with Node.js, Express.js, Next.js, PostgreSQL, and MongoDB.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Product Management**: Admin panel for creating, updating, and deleting products
- **Shopping Cart**: Client-side cart management with persistent storage
- **Checkout Flow**: Complete order processing with order history
- **Server-Side Sorting**: Dynamic product sorting by price, name, and date
- **Reports Dashboard**: SQL and MongoDB aggregations for business analytics
- **Role-Based Access Control**: Admin and customer roles with protected routes
- **Responsive Design**: Minimalist, mobile-friendly interface
- **Comprehensive Testing**: Unit and integration tests for critical features

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: PostgreSQL (users, orders) + MongoDB (products)
- **Authentication**: JWT + bcrypt
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks + localStorage

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- MongoDB 4.4+

### Backend Setup

\`\`\`bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Initialize database
psql -U postgres -d postgres -f scripts/init-db.sql

# Start development server
npm run dev
\`\`\`

Backend runs on `http://localhost:5000`

### Frontend Setup

\`\`\`bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
\`\`\`

Frontend runs on `http://localhost:3000`

## Testing

\`\`\`bash
cd backend
npm run test
\`\`\`

Tests verify:
- User registration and login
- JWT token generation
- Server-side product sorting
- Checkout flow and order creation

## Deployment

### Frontend (Vercel)
\`\`\`bash
vercel deploy --prod
\`\`\`

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Project Structure

\`\`\`
lune-ecommerce/
├── backend/
│   ├── models/          # Database models
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication
│   ├── config/          # Database config
│   ├── tests/           # Test suite
│   ├── scripts/         # Database scripts
│   └── server.js        # Entry point
├── frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   └── public/          # Static assets
├── SETUP.md             # Local setup guide
├── DEPLOYMENT.md        # Deployment guide
└── ARCHITECTURE.md      # System architecture
\`\`\`

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get products (with sorting/filtering)
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders/checkout` - Create order
- `GET /api/orders` - Get user orders

### Reports (Admin)
- `GET /api/reports/daily-revenue` - Daily revenue
- `GET /api/reports/category-sales` - Category sales
- `GET /api/reports/top-customers` - Top customers

## Key Features Explained

### Server-Side Sorting
Products are sorted on the server before being sent to the client. The API accepts `sortBy` and `sortOrder` parameters:

\`\`\`
GET /api/products?sortBy=price&sortOrder=-1
\`\`\`

This ensures consistent sorting and better performance.

### Role-Based Access Control
- **Customer**: Browse products, add to cart, checkout, view orders
- **Admin**: Manage products, view reports, access analytics

### Database Design
- **PostgreSQL**: Relational data (users, orders, transactions)
- **MongoDB**: Product catalog with flexible schema

### Security
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- Input validation on all endpoints
- CORS configured for frontend domain
- Environment variables for secrets

## Testing Framework

Uses Jest for unit and integration tests:

\`\`\`bash
npm run test
\`\`\`

Test coverage includes:
- Authentication (registration, login, JWT)
- Product sorting (default and custom)
- Checkout flow (order creation, calculations)

## Performance Optimizations

1. **Database Indexes** on frequently queried fields
2. **Pagination** to reduce payload size
3. **Client-side Caching** for cart and auth
4. **Responsive Images** with Next.js Image component
5. **Code Splitting** in Next.js

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify MongoDB connection
- Check environment variables

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS settings

### Database errors
- Ensure databases are created
- Check connection strings
- Verify credentials

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with care for Lune skincare brand.
