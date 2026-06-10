import { Router } from 'express';
import asyncHandler from '../middlewares/tryCatch.js';
import { validateRequest } from '../middlewares/validation.js';
import {
  idParamSchema,
  paginationQuerySchema,
  createUserBodySchema,
  updateUserBodySchema,
} from '../core/validation/schemas/index.js';
import {
  getData,
  getErrorDemo,
  queryData,
  createUser,
  listPosts,
  removeUser,
  editUser,
  getStats,
} from '../controllers/api.controller.js';

const router = Router();

/**
 * Sample data endpoint
 * GET /api/data
 */
router.get('/data', asyncHandler(getData));

/**
 * Error demonstration endpoint
 * GET /api/error
 */
router.get('/error', asyncHandler(getErrorDemo));

/**
 * Sample async database query endpoint
 * GET /api/query
 */
router.get('/query', asyncHandler(queryData));

/**
 * Create resource example (201 Created)
 * POST /api/users
 */
router.post('/users', validateRequest({ body: createUserBodySchema }), asyncHandler(createUser));

/**
 * Paginated data example
 * GET /api/posts?page=1&limit=10
 */
router.get('/posts', validateRequest({ query: paginationQuerySchema }), asyncHandler(listPosts));

/**
 * Delete resource example
 * DELETE /api/users/:id
 */
router.delete('/users/:id', validateRequest({ params: idParamSchema }), asyncHandler(removeUser));

/**
 * Update resource example
 * PUT /api/users/:id
 */
router.put(
  '/users/:id',
  validateRequest({ params: idParamSchema, body: updateUserBodySchema }),
  asyncHandler(editUser),
);

/**
 * Statistics example
 * GET /api/stats
 */
router.get('/stats', asyncHandler(getStats));

export default router;
