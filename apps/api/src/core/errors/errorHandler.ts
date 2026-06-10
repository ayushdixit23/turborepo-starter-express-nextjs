import { AppError, type ErrorDetail } from './AppError.js';
import { ERROR_CODES } from './errorCodes.js';

type UnknownError = Error & {
  code?: number;
  name?: string;
  errors?: Record<string, { message: string; path?: string }>;
  keyValue?: Record<string, unknown>;
  path?: string;
};

const getValidationDetails = (error: UnknownError): ErrorDetail[] => {
  if (!error.errors) {
    return [];
  }

  return Object.values(error.errors).map((item) => ({
    field: item.path,
    message: item.message,
  }));
};

export const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof SyntaxError) {
    return new AppError('Malformed JSON body', 400, ERROR_CODES.INVALID_JSON_FORMAT);
  }

  const err = error as UnknownError;

  if (err?.name === 'ValidationError') {
    const details = getValidationDetails(err);
    return new AppError('Validation failed', 400, ERROR_CODES.VALIDATION_FAILED, details);
  }

  if (err?.name === 'CastError') {
    return new AppError(
      'Invalid identifier format',
      400,
      ERROR_CODES.INVALID_REQUEST,
      err.path ? [{ field: err.path, message: 'Invalid value' }] : undefined,
    );
  }

  if (err?.code === 11000) {
    const duplicateField = Object.keys(err.keyValue ?? {})[0];
    return new AppError(
      'Duplicate value found',
      409,
      ERROR_CODES.RESOURCE_CONFLICT,
      duplicateField
        ? [{ field: duplicateField, message: `${duplicateField} already exists` }]
        : undefined,
    );
  }

  return new AppError(
    err?.message || 'Internal Server Error',
    500,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
  );
};
