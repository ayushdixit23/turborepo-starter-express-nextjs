import { PORT, MONGO_URI, NODE_ENV } from './config/env.js';
import connectDb from './config/database.js';
import createApp from './app.js';
import { setupGracefulShutdown } from './utils/gracefulShutdown.js';
import { logger } from './utils/logger.js';

const startServer = async (): Promise<void> => {
  try {
    logger.info({ port: PORT, environment: NODE_ENV }, 'Starting server');

    await connectDb(MONGO_URI);

    const app = createApp();

    const server = app.listen(PORT, () => {
      logger.info(
        {
          url: `http://localhost:${PORT}`,
          environment: NODE_ENV,
          startTime: new Date().toISOString(),
        },
        'Server started successfully',
      );
    });

    setupGracefulShutdown(server);
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
