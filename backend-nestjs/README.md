# InsurSmart Backend - NestJS

A production-ready NestJS backend for the InsurSmart insurance platform (v2.0). Migrated from Express for enhanced scalability and maintainability.

## 📋 Project Structure

```
backend-nestjs/
├── src/
│   ├── users/                 # User management module
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── dtos/
│   │   └── entities/
│   ├── contracts/             # Contract management module
│   ├── claims/                # Claims workflow module
│   ├── auth/                  # JWT authentication module
│   ├── gamification/          # XP, badges, leaderboard module
│   ├── alerts/                # Alert management module
│   ├── common/                # Shared decorators, guards, interceptors
│   ├── config/                # Configuration files
│   ├── app.module.ts          # Root module
│   ├── app.controller.ts      # Root controller
│   ├── app.service.ts         # Root service
│   └── main.ts                # Application entry point
├── prisma/
│   └── schema.prisma          # Database schema
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Setup Prisma database:**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations (creates database schema)
npm run prisma:migrate

# Optional: Seed database with initial data
npm run prisma:seed
```

### Development

```bash
# Start development server (with auto-reload)
npm run start:dev

# Start debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000/api/v1`

### Production

```bash
# Build project
npm run build

# Start production server
npm run start:prod
```

## 📚 API Endpoints

### Health Check
- `GET /api/v1/health` - Check API status

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout/:userId` - User logout

### Users
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Contracts
- `GET /api/v1/contracts` - List all contracts
- `POST /api/v1/contracts` - Create new contract
- `GET /api/v1/contracts/:id` - Get contract by ID
- `PUT /api/v1/contracts/:id` - Update contract
- `DELETE /api/v1/contracts/:id` - Delete contract

### Claims
- `GET /api/v1/claims` - List all claims
- `POST /api/v1/claims` - Create new claim
- `GET /api/v1/claims/:id` - Get claim by ID
- `PUT /api/v1/claims/:id` - Update claim
- `DELETE /api/v1/claims/:id` - Delete claim

### Gamification
- `POST /api/v1/gamification/xp/:userId` - Add XP to user
- `GET /api/v1/gamification/xp/:userId` - Get user XP
- `POST /api/v1/gamification/badge/:userId` - Award badge
- `GET /api/v1/gamification/badges/:userId` - Get user badges
- `GET /api/v1/gamification/leaderboard?limit=10` - Get leaderboard

### Alerts
- `GET /api/v1/alerts` - List all alerts
- `POST /api/v1/alerts` - Create new alert
- `GET /api/v1/alerts/user/:userId` - Get user alerts
- `GET /api/v1/alerts/:id` - Get alert by ID
- `PUT /api/v1/alerts/:id` - Update alert
- `PUT /api/v1/alerts/:id/dismiss` - Dismiss alert
- `DELETE /api/v1/alerts/:id` - Delete alert

## 🗄️ Database

This project uses **Prisma ORM** with PostgreSQL.

### Schema Overview
- **User** - User profiles with authentication
- **Contract** - Insurance contracts
- **Claim** - Insurance claims
- **Badge** - Gamification badges
- **Alert** - User notifications

### Useful Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create/update migrations
npm run prisma:migrate

# Open Prisma Studio (visual DB browser)
npm run prisma:studio

# Seed database
npm run prisma:seed
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

## 🔧 Development Tools

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 📦 Dependencies

### Core
- `@nestjs/common` - Core NestJS functionality
- `@nestjs/core` - NestJS core engine
- `@nestjs/config` - Configuration management
- `@nestjs/jwt` - JWT authentication

### Database
- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI

### Validation
- `class-validator` - DTO validation
- `class-transformer` - Data transformation

### Other
- `axios` - HTTP client
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables

## 📝 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRATION` - Token expiration time
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ Input validation with class-validator
- ✅ Prepared for 2FA integration

## 📄 License

MIT

## 👥 Team

InsurSmart Development Team

## 🤝 Contributing

Contributions are welcome! Please ensure all tests pass and code is properly formatted before submitting PRs.

---

**Next Steps:**
- [ ] Configure PostgreSQL connection
- [ ] Run database migrations
- [ ] Implement JWT authentication guards
- [ ] Add business logic to services
- [ ] Write comprehensive tests
- [ ] Deploy to production environment
