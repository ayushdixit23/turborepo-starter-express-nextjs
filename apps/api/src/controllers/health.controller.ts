import { Request, Response } from 'express';
import os from 'os';
import mongoose from 'mongoose';
import { SuccessResponse } from '../core/responses/SuccessResponse.js';
import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';

export const getHealth = (req: Request, res: Response): Response => {
  const databaseConnected = mongoose.connection.readyState === 1;
  const memoryUsage = process.memoryUsage();

  const payload = {
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: databaseConnected ? 'connected' : 'disconnected',
    },
    system: {
      cpu: {
        cores: os.cpus().length,
      },
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        usagePercent: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
      },
    },
  };

  if (!databaseConnected) {
    throw new AppError('Health check failed', 503, ERROR_CODES.SERVICE_UNAVAILABLE, [
      { field: 'database', message: 'Database is not connected' },
    ]);
  }

  return new SuccessResponse('Health check passed', payload).send(req, res);
};

export const getLiveness = (req: Request, res: Response): Response => {
  return new SuccessResponse('Service is alive', { status: 'alive' }).send(req, res);
};

export const getReadiness = (req: Request, res: Response): Response => {
  const databaseConnected = mongoose.connection.readyState === 1;
  const memoryUsage = process.memoryUsage();
  const memoryPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

  if (!databaseConnected) {
    throw new AppError('Service is not ready', 503, ERROR_CODES.SERVICE_UNAVAILABLE, [
      { field: 'database', message: 'Database is not connected' },
    ]);
  }

  if (memoryPercent > 90) {
    throw new AppError('Service is not ready', 503, ERROR_CODES.SERVICE_UNAVAILABLE, [
      { field: 'memory', message: 'Memory usage too high' },
    ]);
  }

  return new SuccessResponse('Service is ready', { status: 'ready' }).send(req, res);
};
