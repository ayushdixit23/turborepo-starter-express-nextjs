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

const isUnknownError = (error: unknown): error is UnknownError => {
  return typeof error === 'object' && error !== null;
};

const GENERIC_ERROR_MESSAGE = 'Something went wrong! Please try again later.';

export const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof SyntaxError) {
    return new AppError('Malformed JSON body', 400, ERROR_CODES.INVALID_JSON_FORMAT);
  }

  if (!isUnknownError(error)) {
    return new AppError(GENERIC_ERROR_MESSAGE, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
  }

  if (error.name === 'ValidationError') {
    const details = getValidationDetails(error);
    return new AppError('Validation failed', 400, ERROR_CODES.VALIDATION_FAILED, details);
  }

  if (error.name === 'CastError') {
    return new AppError(
      'Invalid identifier format',
      400,
      ERROR_CODES.INVALID_REQUEST,
      error.path ? [{ field: error.path, message: 'Invalid value' }] : undefined,
    );
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue ?? {})[0];
    return new AppError(
      'Duplicate value found',
      409,
      ERROR_CODES.RESOURCE_CONFLICT,
      duplicateField
        ? [{ field: duplicateField, message: `${duplicateField} already exists` }]
        : undefined,
    );
  }

  return new AppError(GENERIC_ERROR_MESSAGE, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
};
