import { Server } from 'http';

import { disconnectDb } from '../config/database.js';
import { logger } from './logger.js';

const closeServer = (server: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
};

export const setupGracefulShutdown = (server: Server): void => {
  const shutdown = (signal: string): void => {
    logger.warn({ signal }, 'Received shutdown signal, starting graceful shutdown');

    void (async () => {
      try {
        await closeServer(server);
        logger.info('HTTP server closed');
        await disconnectDb();
        logger.info('All connections closed, exiting process');
        process.exit(0);
      } catch (error) {
        logger.error({ err: error }, 'Error during shutdown');
        process.exit(1);
      }
    })();

    setTimeout(() => {
      logger.fatal('Forced shutdown due to timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => {
    shutdown('SIGTERM');
  });
  process.on('SIGINT', () => {
    shutdown('SIGINT');
  });

  process.on('uncaughtException', (error: Error) => {
    logger.fatal({ err: error }, 'Uncaught Exception');
    shutdown('UNCAUGHT_EXCEPTION');
  });

  process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
    logger.fatal({ reason, promise }, 'Unhandled Rejection');
    shutdown('UNHANDLED_REJECTION');
  });
};
