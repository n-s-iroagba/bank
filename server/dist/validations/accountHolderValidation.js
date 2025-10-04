"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountHolderQuerySchema = exports.accountHolderIdSchema = exports.updateAccountHolderSchema = exports.createAccountHolderSchema = void 0;
const zod_1 = require("zod");
exports.createAccountHolderSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.number().positive('User ID must be positive'),
        firstName: zod_1.z.string().min(1, 'First name is required'),
        lastName: zod_1.z.string().min(1, 'Last name is required'),
        dateOfBirth: zod_1.z.string().transform(val => new Date(val)),
        address: zod_1.z.string().min(1, 'Address is required'),
        phoneNumber: zod_1.z.string().min(1, 'Phone number is required'),
        ssn: zod_1.z.string().length(9, 'SSN must be 9 digits'),
    }),
});
exports.updateAccountHolderSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(1, 'First name is required').optional(),
        lastName: zod_1.z.string().min(1, 'Last name is required').optional(),
        dateOfBirth: zod_1.z.string().transform(val => new Date(val)).optional(),
        address: zod_1.z.string().min(1, 'Address is required').optional(),
        phoneNumber: zod_1.z.string().min(1, 'Phone number is required').optional(),
        ssn: zod_1.z.string().length(9, 'SSN must be 9 digits').optional(),
    }),
});
exports.accountHolderIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
});
exports.accountHolderQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
