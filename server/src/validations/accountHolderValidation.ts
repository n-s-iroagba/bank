import { z } from 'zod';

export const createAccountHolderSchema = z.object({
  body: z.object({
    userId: z.number().positive('User ID must be positive'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().transform(val => new Date(val)),
    address: z.string().min(1, 'Address is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    ssn: z.string().length(9, 'SSN must be 9 digits'),
  }),
});

export const updateAccountHolderSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
  body: z.object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
    dateOfBirth: z.string().transform(val => new Date(val)).optional(),
    address: z.string().min(1, 'Address is required').optional(),
    phoneNumber: z.string().min(1, 'Phone number is required').optional(),
    ssn: z.string().length(9, 'SSN must be 9 digits').optional(),
  }),
});

export const accountHolderIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
  }),
});

export const accountHolderQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  }),
});