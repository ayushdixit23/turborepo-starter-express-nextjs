import compression from 'compression';
import { RequestHandler } from 'express';

export const compressionMiddleware = (): RequestHandler => compression();
