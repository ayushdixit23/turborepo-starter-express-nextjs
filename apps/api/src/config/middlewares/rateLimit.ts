import { rateLimit } from 'express-rate-limit';

import { RATE_LIMIT_MAX_REQUESTS,RATE_LIMIT_WINDOW_MS } from '../../config/env.js';
import { AppError } from '../../core/errors/AppError.js';
import { ERROR_CODES } from '../../core/errors/errorCodes.js';

export const rateLimitMiddleware = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new AppError(
        'Too many requests from this IP, please try again later.',
        429,
        ERROR_CODES.RATE_LIMIT_EXCEEDED,
      ),
    );
  },
});
