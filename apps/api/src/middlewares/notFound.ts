import { NextFunction,Request, Response } from 'express';

import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';

export const notFoundMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    new AppError(`Route not found`, 404, ERROR_CODES.RESOURCE_NOT_FOUND, [
      { field: 'path', message: `Cannot ${req.method} ${req.originalUrl}` },
    ]),
  );
};
