import { z } from 'zod';

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be a positive integer')
    .refine((value) => Number.parseInt(value, 10) > 0, 'ID must be greater than 0'),
});

export const paginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, 'Page must be a positive integer').optional(),
  limit: z.string().regex(/^\d+$/, 'Limit must be a positive integer').optional(),
});
