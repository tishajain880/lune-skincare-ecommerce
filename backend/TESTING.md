# Backend Testing Guide

## Running Tests

\`\`\`bash
npm run test
\`\`\`

## Test Structure

Tests are located in `/backend/tests/` and cover:

### 1. Authentication Tests (`auth.test.js`)
- User registration
- User login
- JWT token generation
- Invalid credentials handling

**What it tests**: Verifies that users can securely register and login, and that JWT tokens are properly generated.

### 2. Product Sorting Tests (`products.test.js`)
- Default sorting (price descending)
- Custom sorting (price ascending)
- Pagination

**What it tests**: Verifies that products are sorted on the server side by default in descending price order, and can be sorted in ascending order when requested. This is critical for the e-commerce functionality.

### 3. Checkout Tests (`checkout.test.js`)
- Order total calculation
- Cart validation
- Multiple items handling

**What it tests**: Verifies that the checkout flow correctly calculates totals, validates cart contents, and handles multiple items in an order.

## Test Coverage

- Authentication: 3 tests
- Product Sorting: 3 tests
- Checkout: 3 tests

**Total: 9 tests**

## Running Specific Tests

\`\`\`bash
# Run only auth tests
npm run test -- auth.test.js

# Run with coverage
npm run test -- --coverage

# Run in watch mode
npm run test -- --watch
\`\`\`

## Adding New Tests

1. Create test file in `/backend/tests/`
2. Use Jest syntax
3. Run `npm run test` to verify

Example:
\`\`\`javascript
import { describe, it, expect } from "@jest/globals"

describe("Feature Name", () => {
  it("should do something", () => {
    expect(true).toBe(true)
  })
})
\`\`\`

## CI/CD Integration

Tests can be integrated into GitHub Actions:

\`\`\`yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test
