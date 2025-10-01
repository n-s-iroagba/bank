import { z } from 'zod';

export const createCheckingAccountSchema = z.object({
  body: z.object({
    accountHolderId: z.number().positive('Account holder ID must be positive'),
    balance: z.number().nonnegative('Balance cannot be negative').optional(),
  }),
});

export const updateCheckingAccountSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    accountHolderId: z.number().positive('Account holder ID must be positive').optional(),
    balance: z.number().nonnegative('Balance cannot be negative').optional(),
    isActive: z.boolean().optional(),
  }),
});

export const checkingAccountIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const checkingAccountQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});

export const accountHolderIdParamSchema = z.object({
  params: z.object({
    accountHolderId: z.string().transform(Number).refine((n) => n > 0, 'Account holder ID must be positive'),
  }),
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});