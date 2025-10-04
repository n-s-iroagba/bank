import { z } from 'zod';

export const createBankSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Bank name is required'),
    logo: z.string().min(1, 'Logo URL is required'),
  }),
});

export const updateBankSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    name: z.string().min(1, 'Bank name is required').optional(),
    logo: z.string().min(1, 'Logo URL is required').optional(),
  }),
});

export const bankIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const bulkCreateBanksSchema = z.object({
  body: z.object({
    banks: z.array(z.object({
      name: z.string().min(1, 'Bank name is required'),
      logo: z.string().min(1, 'Logo URL is required'),
    })),
  }),
});

export const bankQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});

export const bankIdQuerySchema = z.object({
  params: z.object({
    bankId: z.string().transform(Number).refine((n) => n > 0, 'Bank ID must be positive'),
  }),
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});