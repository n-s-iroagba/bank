"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountStatementSchema = exports.checkingAccountIdParamSchema = exports.transactionQuerySchema = exports.transactionIdSchema = exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
exports.createTransactionSchema = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.enum(['debit', 'credit'], {
            required_error: 'Type is required and must be either debit or credit',
        }),
        amount: zod_1.z.number().positive('Amount must be positive'),
        description: zod_1.z.string().min(1, 'Description is required'),
        checkingAccountId: zod_1.z.number().positive('Checking account ID must be positive'),
        secondPartyId: zod_1.z.number().positive('Second party ID must be positive'),
    }),
});
exports.updateTransactionSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
    body: zod_1.z.object({
        type: zod_1.z.enum(['debit', 'credit']).optional(),
        amount: zod_1.z.number().positive('Amount must be positive').optional(),
        description: zod_1.z.string().min(1, 'Description is required').optional(),
        checkingAccountId: zod_1.z.number().positive('Checking account ID must be positive').optional(),
        secondPartyId: zod_1.z.number().positive('Second party ID must be positive').optional(),
    }),
});
exports.transactionIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
});
exports.transactionQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
exports.checkingAccountIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        checkingAccountId: zod_1.z.string().transform(Number).refine((n) => n > 0, 'Checking account ID must be positive'),
    }),
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
exports.accountStatementSchema = zod_1.z.object({
    params: zod_1.z.object({
        checkingAccountId: zod_1.z.string().transform(Number).refine((n) => n > 0, 'Checking account ID must be positive'),
    }),
    query: zod_1.z.object({
        startDate: zod_1.z.string().transform(val => new Date(val)),
        endDate: zod_1.z.string().transform(val => new Date(val)),
    }),
});
