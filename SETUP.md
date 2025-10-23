# Lune E-Commerce Setup Guide

## Local Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- MongoDB 4.4+
- Git

### Backend Setup

1. Clone repository:
\`\`\`bash
git clone <your-repo-url>
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/lune_db
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lune
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
\`\`\`

4. Initialize PostgreSQL database:
\`\`\`bash
psql -U postgres -d postgres -f scripts/init-db.sql
\`\`\`

5. Start backend:
\`\`\`bash
npm run dev
\`\`\`

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend:
\`\`\`bash
cd ../frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env.local` file:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

4. Start frontend:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on `http://localhost:3000`

## Testing

### Run Backend Tests

\`\`\`bash
cd backend
npm run test
\`\`\`

Tests verify:
- User authentication and JWT tokens
- Product sorting (server-side)
- Checkout flow and order creation

### Manual Testing

1. **Register**: Create new account at `/register`
2. **Browse Products**: Visit `/products`
3. **Add to Cart**: Click "Add" on products
4. **Checkout**: Complete purchase flow
5. **Admin Panel**: Login as admin, add products at `/admin`
6. **Reports**: View analytics at `/reports`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with sorting)
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders/checkout` - Create order
- `GET /api/orders` - Get user orders

### Reports
- `GET /api/reports/daily-revenue` - Daily revenue (admin)
- `GET /api/reports/category-sales` - Category sales (admin)
- `GET /api/reports/top-customers` - Top customers (admin)

## Project Structure

\`\`\`
lune-ecommerce/
├── backend/
│   ├── models/          # Database models
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── config/          # Database config
│   ├── tests/           # Test files
│   ├── scripts/         # Database scripts
│   └── server.js        # Entry point
├── frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   └── public/          # Static assets
└── README.md
\`\`\`

## Troubleshooting

### Port already in use
\`\`\`bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
\`\`\`

### Database connection error
- Verify PostgreSQL is running
- Check connection string in `.env`
- Ensure database exists

### MongoDB connection error
- Verify MongoDB is running
- Check connection string
- Ensure IP whitelist includes your IP

### CORS errors
- Backend CORS is configured for localhost:3000
- Update if running on different port

## Next Steps

1. Customize product categories
2. Add payment processing (Stripe)
3. Implement email notifications
4. Add product reviews
5. Set up analytics
