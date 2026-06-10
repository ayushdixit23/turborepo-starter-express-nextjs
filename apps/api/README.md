# Express API Server

Production-ready Express.js API with TypeScript, MongoDB, and comprehensive security.

## Quick Start

```bash
npm install
cp env.example .env
npm run dev
```

Server runs on `http://localhost:5001`

## Tech Stack

| Technology | Version | Purpose              |
| ---------- | ------- | -------------------- |
| Node.js    | 18+     | Runtime (ES Modules) |
| Express    | 5.x     | Web framework        |
| TypeScript | 6.x     | Strict typing        |
| MongoDB    | 6+      | Database             |
| Mongoose   | 8.x     | ODM                  |
| Zod        | 4.x     | Validation           |
| Pino       | 10.x    | Logging              |

## Features

- **Security**: Helmet (CSP, HSTS), Input Sanitization, Security Monitoring
- **Rate Limiting**: 400 requests/15min (configurable)
- **Request Timeout**: 60 seconds
- **Database Pooling**: 50 max, 5 min connections
- **Error Handling**: RFC 7807 Problem Details format
- **Logging**: Pino (pretty in dev, JSON in prod)
- **Trace IDs**: Request tracing across logs
- **Swagger**: API docs in development

## Project Structure

```
src/
├── config/           # env, database, middlewares config
├── controllers/     # Route handlers (MVC)
├── core/errors/     # AppError, errorCodes
├── core/responses/ # SuccessResponse
├── core/validation/schemas/  # Zod schemas
├── middlewares/    # Security, validation, logging
├── routes/         # Express routes
├── services/       # Business logic
└── utils/         # Logger, graceful shutdown
```

## API Endpoints

| Endpoint         | Method | Description             |
| ---------------- | ------ | ----------------------- |
| `/`              | GET    | Server info             |
| `/health`        | GET    | Health + system metrics |
| `/health/live`   | GET    | Liveness probe          |
| `/health/ready`  | GET    | Readiness probe         |
| `/api/data`      | GET    | Sample data             |
| `/api/users`     | POST   | Create user             |
| `/api/users/:id` | PUT    | Update user             |
| `/api/users/:id` | DELETE | Delete user             |
| `/api/posts`     | GET    | Paginated posts         |
| `/api/stats`     | GET    | Statistics              |

## Response Formats

**Success:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { "id": 1, "name": "John" },
  "metadata": { "timestamp": "...", "traceId": "abc-123" }
}
```

**Error:**

```json
{
  "success": false,
  "message": "Validation failed",
  "error": { "code": "VALIDATION_FAILED", "message": "...", "traceId": "abc-123", "details": [...] },
  "statusCode": 400
}
```

## Environment Variables

| Variable                  | Default                               | Description        |
| ------------------------- | ------------------------------------- | ------------------ |
| `PORT`                    | 5001                                  | Server port        |
| `NODE_ENV`                | development                           | Environment        |
| `MONGO_URI`               | mongodb://localhost:27017/express-app | MongoDB            |
| `ALLOWED_ORIGINS`         | localhost:3000,localhost:3001         | CORS origins       |
| `RATE_LIMIT_MAX_REQUESTS` | 400                                   | Max requests/15min |
| `MONGO_MAX_POOL_SIZE`     | 50                                    | Max DB connections |
| `MONGO_MIN_POOL_SIZE`     | 5                                     | Min DB connections |

## Scripts

```bash
npm run dev       # Development (hot reload)
npm run build    # TypeScript build
npm start        # Production server
npm run lint     # ESLint check
npm run format  # Prettier format
```

## Testing

```bash
# Health
curl http://localhost:5001/health

# Create user
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# Paginated posts
curl "http://localhost:5001/api/posts?page=1&limit=5"
```

## Swagger

Visit `http://localhost:5001/api-docs` in development

## Security Headers

- `Strict-Transport-Security` (HSTS) - 1 year
- `Content-Security-Policy` (CSP)
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Referrer-Policy`

## Production

Set `NODE_ENV=production` to enable:

- Trust proxy
- Security monitoring
- JSON logging
