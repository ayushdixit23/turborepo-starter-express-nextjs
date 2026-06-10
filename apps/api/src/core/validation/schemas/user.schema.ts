import { z } from 'zod';

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().trim().email('Must be a valid email address'),
});

export const updateUserBodySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60).optional(),
  email: z.string().trim().email('Must be a valid email address').optional(),
});
