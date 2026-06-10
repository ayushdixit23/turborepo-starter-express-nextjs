import type { ErrorDetail } from '../errors/AppError.js';

export type { ErrorDetail };

export type SuccessMetadata = {
  timestamp: string;
  traceId: string;
};

export type SuccessPayload<TData> = {
  success: true;
  message: string;
  data: TData;
  metadata: SuccessMetadata;
};

export type ErrorPayload = {
  success: false;
  message: string;
  error: {
    code: string;
    message: string;
    traceId: string;
    details?: ErrorDetail[];
  };
  statusCode: number;
};
