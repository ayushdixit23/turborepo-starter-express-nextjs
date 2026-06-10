import { Request, Response } from 'express';

import { SuccessPayload } from './ApiResponse.js';

export class SuccessResponse<TData> {
  constructor(
    private readonly message: string,
    private readonly data: TData,
    private readonly statusCode: number = 200,
  ) {}

  send(req: Request, res: Response): Response<SuccessPayload<TData>> {
    const payload: SuccessPayload<TData> = {
      success: true,
      message: this.message,
      data: this.data,
      metadata: {
        timestamp: new Date().toISOString(),
        traceId: req.traceId ?? 'unknown',
      },
    };

    return res.status(this.statusCode).json(payload) as Response<SuccessPayload<TData>>;
  }
}
