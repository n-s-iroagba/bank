"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankIdQuerySchema = exports.bankQuerySchema = exports.bulkCreateBanksSchema = exports.bankIdSchema = exports.updateBankSchema = exports.createBankSchema = void 0;
const zod_1 = require("zod");
exports.createBankSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Bank name is required'),
        logo: zod_1.z.string().min(1, 'Logo URL is required'),
    }),
});
exports.updateBankSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Bank name is required').optional(),
        logo: zod_1.z.string().min(1, 'Logo URL is required').optional(),
    }),
});
exports.bankIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
});
exports.bulkCreateBanksSchema = zod_1.z.object({
    body: zod_1.z.object({
        banks: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string().min(1, 'Bank name is required'),
            logo: zod_1.z.string().min(1, 'Logo URL is required'),
        })),
    }),
});
exports.bankQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
exports.bankIdQuerySchema = zod_1.z.object({
    params: zod_1.z.object({
        bankId: zod_1.z.string().transform(Number).refine((n) => n > 0, 'Bank ID must be positive'),
    }),
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
