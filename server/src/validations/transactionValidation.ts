import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    type: z.enum(['debit', 'credit'], {
      required_error: 'Type is required and must be either debit or credit',
    }),
    amount: z.number().positive('Amount must be positive'),
    description: z.string().min(1, 'Description is required'),
    checkingAccountId: z.number().positive('Checking account ID must be positive'),
    secondPartyId: z.number().positive('Second party ID must be positive'),
  }),
});

export const updateTransactionSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    type: z.enum(['debit', 'credit']).optional(),
    amount: z.number().positive('Amount must be positive').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    checkingAccountId: z.number().positive('Checking account ID must be positive').optional(),
    secondPartyId: z.number().positive('Second party ID must be positive').optional(),
  }),
});

export const transactionIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const transactionQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});

export const checkingAccountIdParamSchema = z.object({
  params: z.object({
    checkingAccountId: z.string().transform(Number).refine((n) => n > 0, 'Checking account ID must be positive'),
  }),
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});

export const accountStatementSchema = z.object({
  params: z.object({
    checkingAccountId: z.string().transform(Number).refine((n) => n > 0, 'Checking account ID must be positive'),
  }),
  query: z.object({
    startDate: z.string().transform(val => new Date(val)),
    endDate: z.string().transform(val => new Date(val)),
  }),
});