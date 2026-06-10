import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method.padEnd(6);
    const url = req.originalUrl.padEnd(20);
    const status = res.statusCode;

    const statusStr =
      status >= 500
        ? `\x1b[31m${String(status)}\x1b[0m`
        : status >= 400
          ? `\x1b[33m${String(status)}\x1b[0m`
          : status >= 300
            ? `\x1b[36m${String(status)}\x1b[0m`
            : `\x1b[32m${String(status)}\x1b[0m`;

    logger.info(`${method} ${url} ${statusStr} ${String(duration)}ms`);
  });

  next();
};
