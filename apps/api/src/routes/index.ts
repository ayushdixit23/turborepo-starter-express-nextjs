import { Router } from 'express';

import { getIndex } from '../controllers/index.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.get('/', asyncHandler(getIndex));
router.use('/health', healthRoutes);

export default router;
