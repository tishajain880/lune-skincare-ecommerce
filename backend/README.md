# Lune E-Commerce Backend

Production-ready backend for Lune skincare e-commerce platform.

## Technology Stack

- Node.js + Express.js
- PostgreSQL (users, orders, order_items)
- MongoDB (products)
- JWT Authentication
- bcrypt for password hashing

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables in `.env`:
\`\`\`
DATABASE_URL=your_postgresql_url
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
\`\`\`

3. Initialize PostgreSQL database:
\`\`\`bash
psql -U your_user -d lune_db -f scripts/init-db.sql
\`\`\`

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with sorting, filtering, pagination)
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders/checkout` - Create order
- `GET /api/orders` - Get user orders

### Reports
- `GET /api/reports/daily-revenue` - Daily revenue report (admin only)
- `GET /api/reports/category-sales` - Category-wise sales (admin only)
- `GET /api/reports/top-customers` - Top customers (admin only)

## Testing

Run tests with:
\`\`\`bash
npm run test
\`\`\`

### Test Coverage

- **Authentication Tests**: Verifies user registration, login, and JWT token generation
- **Product Sorting**: Tests server-side sorting by price in descending order by default
- **Checkout Flow**: Validates order creation and item processing

## Features

- Secure JWT-based authentication
- Role-based access control (admin/customer)
- Server-side product sorting with dynamic conditions
- MongoDB aggregations for category-wise sales
- SQL aggregations for revenue reports
- Input validation on all endpoints
- Database indexes for performance optimization
