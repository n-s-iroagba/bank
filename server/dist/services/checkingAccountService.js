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
exports.CheckingAccountService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
class CheckingAccountService {
    createCheckingAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if account holder exists
                const accountHolder = yield repositories_1.accountHolderRepository.findById(data.accountHolderId);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                return yield repositories_1.checkingAccountRepository.create(data);
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create checking account');
            }
        });
    }
    getCheckingAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield repositories_1.checkingAccountRepository.findByIdWithDetails(id);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                return checkingAccount;
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch checking account');
            }
        });
    }
    getCheckingAccountsByAccountHolderId(accountHolderId_1) {
        return __awaiter(this, arguments, void 0, function* (accountHolderId, page = 1, limit = 10) {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findById(accountHolderId);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                const offset = (page - 1) * limit;
                const checkingAccounts = yield repositories_1.checkingAccountRepository.findByAccountHolderId(accountHolderId, {
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                const totalCount = yield repositories_1.checkingAccountRepository.findAndCountAll({
                    where: { accountHolderId },
                });
                return {
                    checkingAccounts,
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
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch checking accounts');
            }
        });
    }
    getAllCheckingAccounts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { count, rows } = yield repositories_1.checkingAccountRepository.findAndCountAll({
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                    include: [{
                            association: 'accountHolder',
                            include: [{
                                    association: 'user',
                                }],
                        }],
                });
                return {
                    checkingAccounts: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(count / limit),
                        totalItems: count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                console.error(error);
                throw new errors_1.InternalServerError('Failed to fetch checking accounts');
            }
        });
    }
    updateCheckingAccount(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield repositories_1.checkingAccountRepository.findById(id);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                // Check if account holder exists if accountHolderId is being updated
                if (data.accountHolderId) {
                    const accountHolder = yield repositories_1.accountHolderRepository.findById(data.accountHolderId);
                    if (!accountHolder) {
                        throw new errors_1.NotFoundError('Account holder not found');
                    }
                }
                const [affectedCount, updatedCheckingAccounts] = yield repositories_1.checkingAccountRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update checking account');
                }
                return updatedCheckingAccounts[0];
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update checking account');
            }
        });
    }
    deleteCheckingAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield repositories_1.checkingAccountRepository.findById(id);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                const deletedCount = yield repositories_1.checkingAccountRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete checking account');
                }
                return { message: 'Checking account deleted successfully' };
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete checking account');
            }
        });
    }
}
exports.CheckingAccountService = CheckingAccountService;
