# Portfolio Backend API

A robust Node.js backend API for a portfolio website with user authentication and course management features.

## 🚀 Features

- **User Authentication**: Register, login, logout with JWT tokens
- **Course Management**: Browse, enroll, and track course progress
- **Progress Tracking**: Detailed progress tracking for enrolled courses
- **Security**: Rate limiting, input validation, CORS protection
- **Dashboard**: User dashboard with course statistics and recent activity

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, bcryptjs, rate limiting
- **Validation**: express-validator

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── courseController.js  # Course management logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handling
│   ├── security.js         # Security middleware (rate limiting, CORS)
│   └── validation.js       # Input validation middleware
├── models/
│   ├── User.js             # User model
│   ├── Course.js           # Course model
│   └── Progress.js         # Course progress tracking model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── courses.js          # Course management routes
├── utils/                  # Utility functions (if needed)
├── index.js                # Main server file
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Smith",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass123"
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses?page=1&limit=10&category=programming&level=beginner&search=javascript
```

#### Get Single Course
```http
GET /api/courses/:courseId
```

#### Enroll in Course
```http
POST /api/courses/:courseId/enroll
Authorization: Bearer <jwt_token>
```

#### Get User's Courses
```http
GET /api/courses/my-courses?page=1&limit=10&status=in-progress
Authorization: Bearer <jwt_token>
```

#### Get Course Progress
```http
GET /api/courses/:courseId/progress
Authorization: Bearer <jwt_token>
```

#### Update Lesson Progress
```http
PUT /api/courses/:courseId/lessons/:lessonId/progress
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "timeSpent": 25
}
```

#### Get Dashboard Data
```http
GET /api/courses/dashboard
Authorization: Bearer <jwt_token>
```

### Health Check
```http
GET /api/health
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Input Sanitization**: XSS protection and input cleaning

## 🗄️ Database Models

### User Model
- Personal information (name, email, avatar)
- Authentication (password, last login)
- Account status and role management

### Course Model
- Course details (title, description, instructor)
- Lessons with ordering and duration
- Enrollment tracking
- Publishing status

### Progress Model
- User course enrollment tracking
- Lesson completion status
- Time tracking and progress percentage
- Certificate issuance tracking

## 🚦 Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "message": "Human readable message",
  "data": {
    // Response data (optional)
  },
  "errors": [
    // Validation errors (optional)
  ]
}
```

## 🔧 Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for auto-restart on file changes.

### Environment Variables

Make sure to set the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRE`: JWT token expiration time
- `CORS_ORIGIN`: Allowed CORS origins
- `NODE_ENV`: Environment (development/production)

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong, unique `JWT_SECRET`
3. Configure proper CORS origins
4. Use a production MongoDB instance
5. Set up proper logging and monitoring
6. Use a reverse proxy (nginx) for SSL termination

## 📝 API Testing

You can test the API using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123"}'

# Get courses
curl http://localhost:5000/api/courses
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Coding! 🎉**
