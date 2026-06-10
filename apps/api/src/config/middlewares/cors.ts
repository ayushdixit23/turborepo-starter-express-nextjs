import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';
import { ALLOWED_ORIGINS } from '../../config/env.js';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const corsMiddleware = (): RequestHandler => cors(corsOptions);
