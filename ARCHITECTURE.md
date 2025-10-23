# Lune E-Commerce Architecture

## System Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  - Product Catalog    - Shopping Cart    - User Dashboard   │
│  - Admin Panel        - Reports          - Authentication   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express.js)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes & Controllers                │   │
│  │  - Auth      - Products    - Orders    - Reports    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Middleware & Authentication               │   │
│  │  - JWT Verification    - Role-Based Access Control  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────┬──────────────────────────────┬──────────────────┘
             │                              │
             ▼                              ▼
    ┌─────────────────┐          ┌──────────────────┐
    │   PostgreSQL    │          │     MongoDB      │
    │                 │          │                  │
    │ - Users         │          │ - Products       │
    │ - Orders        │          │ - Categories     │
    │ - Order Items   │          │                  │
    └─────────────────┘          └──────────────────┘
\`\`\`

## Database Schema

### PostgreSQL (Relational Data)

**users**
- id (PK)
- name
- email (UNIQUE)
- passwordHash
- role (admin/customer)
- createdAt

**orders**
- id (PK)
- userId (FK → users)
- total
- createdAt

**order_items**
- id (PK)
- orderId (FK → orders)
- productId (FK → MongoDB)
- quantity
- priceAtPurchase

### MongoDB (Product Catalog)

**products**
\`\`\`json
{
  "_id": ObjectId,
  "sku": "string",
  "name": "string",
  "price": number,
  "category": "string",
  "description": "string",
  "updatedAt": Date
}
\`\`\`

## Authentication Flow

1. User registers with email/password
2. Password hashed with bcrypt (10 rounds)
3. JWT token generated with user ID and role
4. Token stored in localStorage (frontend)
5. Token sent in Authorization header for protected routes
6. Backend verifies JWT signature and expiration
7. Role-based access control applied

## API Response Format

### Success Response
\`\`\`json
{
  "data": {},
  "message": "Success"
}
\`\`\`

### Error Response
\`\`\`json
{
  "error": "Error message",
  "status": 400
}
\`\`\`

## Server-Side Sorting Implementation

Products endpoint supports dynamic sorting:

\`\`\`
GET /api/products?sortBy=price&sortOrder=-1
\`\`\`

- `sortBy`: Field to sort by (price, name, updatedAt)
- `sortOrder`: -1 (descending) or 1 (ascending)
- Default: price descending

Sorting happens in MongoDB before data is sent to client.

## Performance Optimizations

1. **Database Indexes**
   - users.email
   - orders.userId
   - orders.createdAt
   - products.category
   - products.sku

2. **Pagination**
   - Default limit: 12 items per page
   - Reduces payload size
   - Improves load times

3. **Caching**
   - Frontend: localStorage for cart
   - Frontend: localStorage for auth token
   - Backend: Can add Redis for session caching

## Security Measures

1. **Authentication**
   - JWT tokens with expiration
   - Secure password hashing (bcrypt)

2. **Authorization**
   - Role-based access control
   - Admin-only endpoints protected

3. **Input Validation**
   - All inputs validated on server
   - Type checking with TypeScript

4. **CORS**
   - Configured for frontend domain
   - Prevents unauthorized cross-origin requests

5. **Environment Variables**
   - Secrets never committed to git
   - Separate .env files for dev/prod

## Deployment Architecture

\`\`\`
┌──────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                 │
│  - Auto-deploys on git push                          │
│  - Global CDN for static assets                      │
│  - Serverless functions (optional)                   │
└──────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│                  Render (Backend)                    │
│  - Node.js server                                    │
│  - Auto-deploys on git push                          │
│  - Environment variables managed                     │
└──────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   PostgreSQL      MongoDB Atlas      External APIs
   (Render)        (Cloud)            (if needed)
\`\`\`

## Scalability Considerations

1. **Database**
   - Add read replicas for PostgreSQL
   - Implement connection pooling
   - Archive old orders

2. **Backend**
   - Implement caching layer (Redis)
   - Add rate limiting
   - Use load balancing

3. **Frontend**
   - Implement code splitting
   - Add service workers for offline support
   - Optimize images

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Add performance monitoring
   - Log aggregation
