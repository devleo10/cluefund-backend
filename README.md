# Cluefund - Smart Mutual Fund Tracker (Server)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000)](https://jwt.io/)

The backend server for Cluefund, providing authentication, database operations, and API endpoints for the mutual fund tracking application.

## Features

- **RESTful API**: Clean and well-structured API endpoints
- **User Authentication**: JWT-based secure authentication system
- **MongoDB Integration**: Persistent storage for user and fund data
- **Middleware Support**: Request validation and error handling
- **CORS Support**: Secure cross-origin resource sharing
- **Production Ready**: Optimized for deployment on cloud platforms

## Tech Stack

- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for creating the API endpoints
- **MongoDB**: NoSQL database for storing user and fund data
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure authentication
- **bcrypt**: Password hashing for secure user data
- **cors**: Middleware for enabling CORS with various options

## Getting Started

### Prerequisites

- Node.js (v16 or later)
  - Required to run the Express server and its dependencies
  - Provides the environment for server-side JavaScript execution
- MongoDB (local instance or MongoDB Atlas account)
  - Stores user information, saved funds, and application data
  - Required for all database operations

### Installation

1. Clone the repository (if not already done):
   ```bash
   git clone https://github.com/yourusername/cluefund.git
   cd cluefund/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your MongoDB URI and JWT secret

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the API documentation:
   - Visit `http://localhost:3000/api-docs` in your browser

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Port on which the server runs | 5678 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/cluefund |
| JWT_SECRET | Secret key for JWT token generation | your_secret_key_here |
| NODE_ENV | Environment (development/production) | development |

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Register a new user
  - Body: `{ name, email, password }`
  - Returns: User object with JWT token

- **POST /api/auth/login**
  - Login an existing user
  - Body: `{ email, password }`
  - Returns: User object with JWT token

### Funds

- **GET /api/funds**
  - Get all saved funds for the authenticated user
  - Headers: `Authorization: Bearer {token}`
  - Returns: Array of fund objects

- **POST /api/funds/save**
  - Save a fund to the user's portfolio
  - Headers: `Authorization: Bearer {token}`
  - Body: Fund object
  - Returns: Saved fund object

- **DELETE /api/funds/remove**
  - Remove a fund from the user's portfolio
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ schemeCode }`
  - Returns: Success message

## Project Structure

```
server/
├── controllers/        # Route controllers
│   ├── authController.js
│   └── fundController.js
├── middleware/         # Express middleware
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/             # Mongoose models
│   ├── Fund.js
│   └── User.js
├── routes/             # API routes
│   ├── authRoutes.js
│   └── fundRoutes.js
├── scripts/            # Utility scripts
│   └── fixDatabaseIndex.mjs
├── .env                # Environment variables
├── .env.example        # Example environment file
├── index.mjs           # Application entry point
└── package.json        # NPM package configuration
```

## Data Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- Timestamps: createdAt, updatedAt

### Fund
- `userId`: ObjectId (reference to User)
- `schemeCode`: String (required)
- `schemeName`: String (required)
- `fundHouse`: String
- `schemeType`: String
- `schemeCategory`: String
- `savedAt`: Date (default: now)
- Compound index on `userId` and `schemeCode` to prevent duplicates per user

## Error Handling

The server implements a centralized error handling middleware that:
- Captures all thrown errors in controllers
- Formats error responses consistently
- Includes appropriate HTTP status codes
- Provides detailed messages in development mode
- Protects sensitive information in production

## Security Features

- Password hashing using bcrypt
- JWT authentication with token verification
- Protected routes requiring authentication
- Input validation for user-provided data
- CORS configuration to restrict origins in production
- Environment variable management for sensitive data

## Deployment

The server is currently deployed on Render:
- **URL**: [https://cluefund-backend.onrender.com](https://cluefund-backend.onrender.com)
- **Platform**: Render Web Service
- **Type**: Node.js application
- **Environment**: Production

The server can also be deployed to other Node.js hosting platforms such as:
- Heroku
- AWS
- DigitalOcean
- Google Cloud Platform

Ensure all environment variables are properly configured in your hosting environment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/) for the web framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Mongoose](https://mongoosejs.com/) for elegant MongoDB object modeling
- [JWT](https://jwt.io/) for secure authentication implementation
- [Render](https://render.com/) for hosting the production API
