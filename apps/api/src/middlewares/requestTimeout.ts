import { NextFunction, Request, Response } from 'express';

import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';

export const requestTimeout = (req: Request, res: Response, next: NextFunction): void => {
  const timeout = 60000;

  const timer = setTimeout(() => {
    clearTimeout(timer);
    if (!res.writableEnded) {
      const error = new AppError(
        'Request timeout after 60 seconds',
        408,
        ERROR_CODES.REQUEST_TIMEOUT,
      );
      next(error);
    }
  }, timeout);

  res.on('finish', () => {
    clearTimeout(timer);
  });

  next();
};
