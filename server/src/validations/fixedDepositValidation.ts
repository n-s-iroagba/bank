import { z } from 'zod';

export const createFixedDepositSchema = z.object({
  body: z.object({
    accountHolderId: z.number().positive('Account holder ID must be positive'),
    balance: z.number().nonnegative('Balance cannot be negative').optional(),
    term: z.number().positive('Term must be positive'),
    interestRate: z.number().nonnegative('Interest rate cannot be negative'),
  }),
});

export const updateFixedDepositSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    accountHolderId: z.number().positive('Account holder ID must be positive').optional(),
    balance: z.number().nonnegative('Balance cannot be negative').optional(),
    term: z.number().positive('Term must be positive').optional(),
    interestRate: z.number().nonnegative('Interest rate cannot be negative').optional(),
    isActive: z.boolean().optional(),
  }),
});

export const fixedDepositIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const fixedDepositQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});