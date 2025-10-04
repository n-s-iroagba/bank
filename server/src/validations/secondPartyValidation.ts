import { z } from 'zod';

export const createSecondPartySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    details: z.string().min(1, 'Details are required'),
    bankId: z.number().positive('Bank ID must be positive'),
  }),
});

export const updateSecondPartySchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    details: z.string().min(1, 'Details are required').optional(),
    bankId: z.number().positive('Bank ID must be positive').optional(),
  }),
});

export const secondPartyIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const bulkCreateSecondPartiesSchema = z.object({
  body: z.object({
    secondParties: z.array(z.object({
      name: z.string().min(1, 'Name is required'),
      details: z.string().min(1, 'Details are required'),
      bankId: z.number().positive('Bank ID must be positive'),
    })),
  }),
});

export const secondPartyQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});