import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

declare module 'express-serve-static-core' {
  interface Request {
    traceId?: string;
  }
}

export const traceIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const traceId = req.headers['x-trace-id']?.toString() || randomUUID();
  req.traceId = traceId;
  res.setHeader('x-trace-id', traceId);
  next();
};
