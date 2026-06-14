import dotenv from 'dotenv';

dotenv.config();

/**
 * Validates that required environment variables are present
 * @param key - The environment variable key
 * @param defaultValue - Optional default value
 * @returns The environment variable value or default
 */
const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  const value = process.env[key]?.trim() || defaultValue;

  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined`);
  }

  return value;
};

// Environment Configuration
export const PORT = getEnvVariable('PORT', '5001');
export const NODE_ENV = getEnvVariable('NODE_ENV', 'development');
export const MONGO_URI = getEnvVariable('MONGO_URI', 'mongodb://localhost:27017/express-app');

// CORS Configuration
export const ALLOWED_ORIGINS = getEnvVariable(
  'ALLOWED_ORIGINS',
  'http://localhost:3000,http://localhost:3001',
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Rate Limiting Configuration
export const RATE_LIMIT_WINDOW_MS = parseInt(getEnvVariable('RATE_LIMIT_WINDOW_MS', '900000'), 10); // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = parseInt(
  getEnvVariable('RATE_LIMIT_MAX_REQUESTS', '400'),
  10,
);

// MongoDB Connection Pool Configuration
export const MONGO_MAX_POOL_SIZE = parseInt(getEnvVariable('MONGO_MAX_POOL_SIZE', '50'), 10);
export const MONGO_MIN_POOL_SIZE = parseInt(getEnvVariable('MONGO_MIN_POOL_SIZE', '5'), 10);
export const MONGO_SOCKET_TIMEOUT_MS = parseInt(
  getEnvVariable('MONGO_SOCKET_TIMEOUT_MS', '60000'),
  10,
);
export const MONGO_SERVER_SELECTION_TIMEOUT_MS = parseInt(
  getEnvVariable('MONGO_SERVER_SELECTION_TIMEOUT_MS', '10000'),
  10,
);
export const MONGO_MAX_IDLE_TIME_MS = parseInt(
  getEnvVariable('MONGO_MAX_IDLE_TIME_MS', '30000'),
  10,
);

// Request timeout
export const REQUEST_TIMEOUT_MS = parseInt(getEnvVariable('REQUEST_TIMEOUT_MS', '60000'), 10);

// Health check readiness memory threshold (percent, 0-100)
export const READINESS_MEMORY_THRESHOLD = parseInt(
  getEnvVariable('READINESS_MEMORY_THRESHOLD', '90'),
  10,
);

// Security monitoring
export const SECURITY_MAX_PAYLOAD_SIZE = parseInt(
  getEnvVariable('SECURITY_MAX_PAYLOAD_SIZE', '5242880'),
  10,
); // 5MB
