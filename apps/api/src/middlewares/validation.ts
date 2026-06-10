import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';

type RequestSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

const mapZodIssues = (zodError: ZodError) => {
  return zodError.issues.map((issue) => ({
    field: issue.path.join('.') || undefined,
    message: issue.message,
  }));
};

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        schemas.params.parse(req.params);
      }

      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = mapZodIssues(error);
        next(new AppError('Validation failed', 400, ERROR_CODES.VALIDATION_FAILED, details));
        return;
      }

      next(error);
    }
  };
};
