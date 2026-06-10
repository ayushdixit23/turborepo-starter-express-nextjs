import { Router, Request, Response } from 'express';
import { NODE_ENV } from '../config/env.js';
import { SuccessResponse } from '../core/responses/SuccessResponse.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return new SuccessResponse('Server metadata retrieved', {
    message: 'Express API Server',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  }).send(req, res);
});

export default router;
