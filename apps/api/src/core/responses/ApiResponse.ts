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

export type ErrorDetail = {
  field?: string;
  message: string;
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
