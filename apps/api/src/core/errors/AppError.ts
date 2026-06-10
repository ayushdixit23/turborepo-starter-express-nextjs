import { ErrorCode, ERROR_CODES } from './errorCodes.js';

export type ErrorDetail = {
  field?: string;
  message: string;
};

export class AppError extends Error {
  public readonly success = false;
  public readonly isOperational = true;

  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code: ErrorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
    public readonly details?: ErrorDetail[],
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
