import { Router } from 'express';

import { getHealth, getLiveness, getReadiness } from '../controllers/health.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = Router();

/**
 * Health check endpoint
 * GET /health
 */
router.get('/', asyncHandler(getHealth));

/**
 * Liveness probe - simple check if server is running
 * GET /health/live
 */
router.get('/live', asyncHandler(getLiveness));

/**
 * Readiness probe - check if server is ready to accept traffic
 * GET /health/ready
 */
router.get('/ready', asyncHandler(getReadiness));

export default router;
