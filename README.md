# Backend API

A RESTful API built with Express.js, TypeScript, MongoDB, and Typegoose.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- TypeScript for type safety
- MongoDB with Typegoose ODM
- Zod for input validation
- Error handling middleware
- Async handler wrapper

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- pnpm (or npm/yarn)

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-jwt-secret
```

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### Authentication

```bash
# Register a new user
POST /api/auth/register
{
  "username": "example",
  "email": "user@example.com",
  "password": "Password123",
  "profileImage": "optional-image-url"
}

# Login user
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}

# Get user profile (Protected route)
GET /api/auth/me
Header: Authorization: Bearer <token>
```
