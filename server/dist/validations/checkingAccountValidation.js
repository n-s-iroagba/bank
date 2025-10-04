"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountHolderIdParamSchema = exports.checkingAccountQuerySchema = exports.checkingAccountIdSchema = exports.updateCheckingAccountSchema = exports.createCheckingAccountSchema = void 0;
const zod_1 = require("zod");
exports.createCheckingAccountSchema = zod_1.z.object({
    body: zod_1.z.object({
        accountHolderId: zod_1.z.number().positive('Account holder ID must be positive'),
        balance: zod_1.z.number().nonnegative('Balance cannot be negative').optional(),
    }),
});
exports.updateCheckingAccountSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
    body: zod_1.z.object({
        accountHolderId: zod_1.z.number().positive('Account holder ID must be positive').optional(),
        balance: zod_1.z.number().nonnegative('Balance cannot be negative').optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.checkingAccountIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform(Number).refine((n) => n > 0, 'ID must be positive'),
    }),
});
exports.checkingAccountQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
exports.accountHolderIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        accountHolderId: zod_1.z.string().transform(Number).refine((n) => n > 0, 'Account holder ID must be positive'),
    }),
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
        limit: zod_1.z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
    }),
});
