# Motbook Shop API

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create .env file in root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/motbook
JWT_SECRET=your_jwt_secret_key
```

3. Start the server:
```bash
npm start
```

## Project Structure
```
my-app/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # Route definitions
├── utils/         # Utility functions
└── validators/    # Input validation
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- POST /api/auth/refresh-token - Refresh JWT token

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books/upload - Upload new book (Admin)
- PATCH /api/books/:id - Update book (Admin)
- DELETE /api/books/:id - Delete book (Admin)

### Admin
- GET /api/admin/users - Get all users (Admin)
- DELETE /api/admin/users/:id - Delete user (Admin)
- PUT /api/admin/users/:id/role - Update user role (Admin)

## Authentication
The API uses JWT for authentication. Include the token in the Authorization header:
```
Authorization: Bearer your_token_here
