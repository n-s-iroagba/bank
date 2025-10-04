"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondPartyQuerySchema = exports.bulkCreateSecondPartiesSchema = exports.secondPartyIdSchema = exports.updateSecondPartySchema = exports.createSecondPartySchema = void 0;
const zod_1 = require("zod");
exports.createSecondPartySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        details: zod_1.z.string().min(1, 'Details are required'),
        bankId: zod_1.z.number().positive('Bank ID must be positive'),
    }),
});
exports.updateSecondPartySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        details: zod_1.z.string().min(1, 'Details are required').optional(),
        bankId: zod_1.z.number().positive('Bank ID must be positive').optional(),
    }),
});
exports.secondPartyIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
});
exports.bulkCreateSecondPartiesSchema = zod_1.z.object({
    body: zod_1.z.object({
        secondParties: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required'),
            details: zod_1.z.string().min(1, 'Details are required'),
            bankId: zod_1.z.number().positive('Bank ID must be positive'),
        })),
    }),
});
exports.secondPartyQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
