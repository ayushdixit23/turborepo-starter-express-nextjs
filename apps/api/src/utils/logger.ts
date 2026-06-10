import pino from 'pino';
import { NODE_ENV } from '../config/env.js';

export const logger = pino({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            colorizeObjects: false,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            singleLine: true,
            levelFirst: true,
            messageFormat: '{msg}',
          },
        }
      : undefined,
});
