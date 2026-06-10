import { Request, Response } from 'express';
import { SuccessResponse } from '../core/responses/SuccessResponse.js';
import { AppError } from '../core/errors/AppError.js';
import { ERROR_CODES } from '../core/errors/errorCodes.js';
import * as userService from '../services/user.service.js';

export const getData = (_req: Request, res: Response): Response => {
  const data = {
    timestamp: new Date().toISOString(),
    info: 'Sample data from server',
  };

  return new SuccessResponse('Data retrieved successfully', data).send(_req, res);
};

export const getErrorDemo = (_req: Request, _res: Response): never => {
  throw new AppError('Something went wrong!', 400, ERROR_CODES.INVALID_REQUEST);
};

export const queryData = async (req: Request, res: Response): Promise<Response> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const data = {
    id: 1,
    name: 'Sample Data',
    timestamp: new Date().toISOString(),
  };

  return new SuccessResponse('Data fetched from database', data).send(req, res);
};

export const createUser = (req: Request, res: Response): Response => {
  const user = userService.createUser(req.body);
  return new SuccessResponse('User created successfully', user, 201).send(req, res);
};

export const listPosts = (req: Request, res: Response): Response => {
  const page = Number.parseInt(req.query.page as string, 10) || 1;
  const limit = Number.parseInt(req.query.limit as string, 10) || 10;

  const posts = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    title: `Post ${(page - 1) * limit + i + 1}`,
    content: 'Sample post content',
    author: 'Admin',
  }));

  const total = 100;
  const totalPages = Math.ceil(total / limit);

  const responseData = {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };

  return new SuccessResponse('Posts retrieved successfully', responseData).send(req, res);
};

export const removeUser = (req: Request, res: Response): Response => {
  const id = Number.parseInt(req.params.id as string, 10);
  userService.deleteUser(id);
  return new SuccessResponse(`User with ID ${id} deleted successfully`, { id }).send(req, res);
};

export const editUser = (req: Request, res: Response): Response => {
  const id = Number.parseInt(req.params.id as string, 10);
  const updatedUser = userService.updateUser(id, req.body);
  return new SuccessResponse('User updated successfully', updatedUser).send(req, res);
};

export const getStats = (req: Request, res: Response): Response => {
  const stats = {
    totalUsers: 1250,
    activeUsers: 876,
    totalPosts: 3421,
    totalComments: 8765,
    generatedAt: new Date().toISOString(),
  };

  return new SuccessResponse('Statistics retrieved successfully', stats).send(req, res);
};
