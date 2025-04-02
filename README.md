# BookStore Backend API

A RESTful API built with Express.js, TypeScript, MongoDB, and Typegoose for managing a book recommendation application.

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
POST /api/v1/auth/register
{
  "username": "example",
  "email": "user@example.com",
  "password": "Password123",
  "profileImage": "optional-image-url"
}

# Login user
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}

# Get user profile (Protected route)
GET /api/v1/auth/me
Header: Authorization: Bearer <token>
```

### Books

```bash
# Create a new book
POST /api/v1/book/create-book
{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description",
  "price": 19.99,
  "imageUrl": "optional-image-url"
}

# Get all books
GET /api/v1/book/get-books

# Get book recommendations
GET /api/v1/book/get-books-recommendation

# Delete a book by ID
DELETE /api/v1/book/delete-book/:id
```
