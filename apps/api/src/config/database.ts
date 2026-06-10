import mongoose from 'mongoose';

import { logger } from '../utils/logger.js';
import {
  MONGO_MAX_IDLE_TIME_MS,
  MONGO_MAX_POOL_SIZE,
  MONGO_MIN_POOL_SIZE,
  MONGO_SERVER_SELECTION_TIMEOUT_MS,
  MONGO_SOCKET_TIMEOUT_MS,
} from './env.js';

const connectDb = async (dbUrl: string): Promise<void> => {
  try {
    await mongoose.connect(dbUrl, {
      maxPoolSize: MONGO_MAX_POOL_SIZE,
      minPoolSize: MONGO_MIN_POOL_SIZE,
      socketTimeoutMS: MONGO_SOCKET_TIMEOUT_MS,
      serverSelectionTimeoutMS: MONGO_SERVER_SELECTION_TIMEOUT_MS,
      maxIdleTimeMS: MONGO_MAX_IDLE_TIME_MS,
    });

    logger.info(
      {
        dbName: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        poolSize: MONGO_MAX_POOL_SIZE,
      },
      'MongoDB connection established successfully',
    );
  } catch (error) {
    logger.fatal({ err: error }, 'MongoDB connection failed');
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  logger.error({ err }, 'Mongoose connection error');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
  logger.info('Mongoose reconnected to MongoDB');
});

export const disconnectDb = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error({ err: error }, 'Error disconnecting from MongoDB');
  }
};

export default connectDb;
