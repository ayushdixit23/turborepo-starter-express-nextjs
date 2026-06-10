import express from 'express';
import { NODE_ENV } from './config/env.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFound.js';
import { traceIdMiddleware } from './middlewares/traceId.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { requestTimeout } from './middlewares/requestTimeout.js';
import { sanitizeMiddleware } from './middlewares/sanitize.js';
import { securityMonitor } from './middlewares/securityMonitor.js';
import {
  helmetMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
  compressionMiddleware,
} from './config/middlewares/index.js';
import setupSwagger from './config/swagger.js';
import allAppRoutes from './routes/index.js';
import rootRoutes from './routes/root.routes.js';

const createApp = (): express.Application => {
  const app = express();

  app.use(requestTimeout);

  app.use(corsMiddleware());

  app.use(helmetMiddleware());

  app.use(traceIdMiddleware);

  app.use(rateLimitMiddleware);

  app.use(requestLogger);

  app.use(compressionMiddleware());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(sanitizeMiddleware);

  if (NODE_ENV === 'production') {
    app.use(securityMonitor);
    app.set('trust proxy', 1);
  }

  setupSwagger(app);

  app.use('/', rootRoutes);

  app.use('/', allAppRoutes);

  app.use(notFoundMiddleware);

  app.use(errorMiddleware);

  return app;
};

export default createApp;
