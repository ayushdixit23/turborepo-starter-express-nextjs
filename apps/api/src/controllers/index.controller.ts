import { Request, Response } from 'express';

import { NODE_ENV } from '../config/env.js';
import { SuccessResponse } from '../core/responses/SuccessResponse.js';

export const getIndex = (_req: Request, res: Response): Response => {
  return new SuccessResponse('Express Server is running', {
    name: 'next-express-starter-api',
    version: '1.0.0',
    docs: NODE_ENV !== 'production' ? '/api-docs' : undefined,
  }).send(_req, res);
};
