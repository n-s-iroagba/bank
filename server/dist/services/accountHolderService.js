"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHolderService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
const _1 = require(".");
class AccountHolderService {
    createAccountHolder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield _1.userService.createUser(Object.assign({}, data));
                return yield repositories_1.accountHolderRepository.create(Object.assign(Object.assign({}, data), { userId: user.id }));
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create account holder');
            }
        });
    }
    getAccountHolderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findByIdWithDetails(id);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                return accountHolder;
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch account holder');
            }
        });
    }
    getAllAccountHolders() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const accountHolders = yield repositories_1.accountHolderRepository.findAllWithUserDetails({
                    limit,
                    offset,
                    order: [['firstName', 'ASC'], ['lastName', 'ASC']],
                });
                const totalCount = yield repositories_1.accountHolderRepository.findAndCountAll({});
                return {
                    accountHolders,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalCount.count / limit),
                        totalItems: totalCount.count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                console.error(error);
                throw new errors_1.InternalServerError('Failed to fetch account holders');
            }
        });
    }
    updateAccountHolder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findById(id);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                // Check if SSN is being updated and if it's already in use
                if (data.ssn && data.ssn !== accountHolder.ssn) {
                    const existingSSN = yield repositories_1.accountHolderRepository.findBySsn(data.ssn);
                    if (existingSSN) {
                        throw new errors_1.ConflictError('SSN is already in use');
                    }
                }
                const [affectedCount, updatedAccountHolders] = yield repositories_1.accountHolderRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update account holder');
                }
                return updatedAccountHolders[0];
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update account holder');
            }
        });
    }
    deleteAccountHolder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findById(id);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                const deletedCount = yield repositories_1.accountHolderRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete account holder');
                }
                return { message: 'Account holder deleted successfully' };
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete account holder');
            }
        });
    }
}
exports.AccountHolderService = AccountHolderService;
