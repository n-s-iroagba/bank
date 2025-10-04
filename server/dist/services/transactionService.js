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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const database_1 = __importDefault(require("../config/database"));
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
class TransactionService {
    createTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if checking account exists
                const checkingAccount = yield repositories_1.checkingAccountRepository.findById(data.checkingAccountId);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                // Check if second party exists
                const secondParty = yield repositories_1.secondPartyRepository.findById(data.secondPartyId);
                if (!secondParty) {
                    throw new errors_1.NotFoundError('Second party not found');
                }
                // Calculate new balance
                const currentBalance = parseFloat(checkingAccount.balance.toString());
                const transactionAmount = parseFloat(data.amount.toString());
                let newBalance;
                if (data.type === 'credit') {
                    newBalance = currentBalance + transactionAmount;
                }
                else {
                    newBalance = currentBalance - transactionAmount;
                    // Check for sufficient funds
                    if (newBalance < 0) {
                        throw new errors_1.ValidationError('Insufficient funds for this transaction');
                    }
                }
                // Use transaction to ensure data consistency
                const result = yield database_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    // Update account balance
                    yield repositories_1.checkingAccountRepository.updateBalance(data.checkingAccountId, data.type === 'credit' ? transactionAmount : -transactionAmount, t);
                    // Create transaction record with updated balance
                    const transaction = yield repositories_1.transactionRepository.create(Object.assign(Object.assign({}, data), { balanceAfter: newBalance }), t);
                    return transaction;
                }));
                return result;
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create transaction');
            }
        });
    }
    // Add this method to server/src/services/admin/transactionService.ts
    getTransactionsByAccountHolderId(accountHolderId_1) {
        return __awaiter(this, arguments, void 0, function* (accountHolderId, page = 1, limit = 10) {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findById(accountHolderId);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                const offset = (page - 1) * limit;
                const transactions = yield repositories_1.transactionRepository.findByAccountHolderId(accountHolderId, {
                    limit,
                    offset,
                    include: ['secondParty', 'checkingAccount'],
                });
                const totalCount = yield repositories_1.transactionRepository.findAndCountAll({
                    where: {},
                    include: [{
                            association: 'checkingAccount',
                            where: { accountHolderId },
                        }],
                });
                return {
                    transactions,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalCount.count / limit),
                        totalItems: totalCount.count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch transactions');
            }
        });
    }
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield repositories_1.transactionRepository.findById(id, {
                    include: ['checkingAccount', 'secondParty'],
                });
                if (!transaction) {
                    throw new errors_1.NotFoundError('Transaction not found');
                }
                return transaction;
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch transaction');
            }
        });
    }
    getTransactionsByCheckingAccountId(checkingAccountId_1) {
        return __awaiter(this, arguments, void 0, function* (checkingAccountId, page = 1, limit = 10) {
            try {
                const checkingAccount = yield repositories_1.checkingAccountRepository.findById(checkingAccountId);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                const offset = (page - 1) * limit;
                const transactions = yield repositories_1.transactionRepository.findByCheckingAccountId(checkingAccountId, {
                    limit,
                    offset,
                    include: ['secondParty'],
                });
                const totalCount = yield repositories_1.transactionRepository.findAndCountAll({
                    where: { checkingAccountId },
                });
                return {
                    transactions,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalCount.count / limit),
                        totalItems: totalCount.count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch transactions');
            }
        });
    }
    getAllTransactions() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const transactions = yield repositories_1.transactionRepository.findWithDetails(undefined, {
                    limit,
                    offset,
                });
                const totalCount = yield repositories_1.transactionRepository.findAndCountAll({});
                return {
                    transactions,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalCount.count / limit),
                        totalItems: totalCount.count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                throw new errors_1.InternalServerError('Failed to fetch transactions');
            }
        });
    }
    updateTransaction(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield repositories_1.transactionRepository.findById(id);
                if (!transaction) {
                    throw new errors_1.NotFoundError('Transaction not found');
                }
                // Check if checking account exists if checkingAccountId is being updated
                if (data.checkingAccountId) {
                    const checkingAccount = yield repositories_1.checkingAccountRepository.findById(data.checkingAccountId);
                    if (!checkingAccount) {
                        throw new errors_1.NotFoundError('Checking account not found');
                    }
                }
                // Check if second party exists if secondPartyId is being updated
                if (data.secondPartyId) {
                    const secondParty = yield repositories_1.secondPartyRepository.findById(data.secondPartyId);
                    if (!secondParty) {
                        throw new errors_1.NotFoundError('Second party not found');
                    }
                }
                const [affectedCount, updatedTransactions] = yield repositories_1.transactionRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update transaction');
                }
                return updatedTransactions[0];
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update transaction');
            }
        });
    }
    deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield repositories_1.transactionRepository.findById(id);
                if (!transaction) {
                    throw new errors_1.NotFoundError('Transaction not found');
                }
                const deletedCount = yield repositories_1.transactionRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete transaction');
                }
                return { message: 'Transaction deleted successfully' };
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete transaction');
            }
        });
    }
    getAccountStatement(checkingAccountId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield repositories_1.checkingAccountRepository.findById(checkingAccountId);
                if (!checkingAccount) {
                    throw new errors_1.NotFoundError('Checking account not found');
                }
                return yield repositories_1.transactionRepository.getAccountStatement(checkingAccountId, startDate, endDate);
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch account statement');
            }
        });
    }
}
exports.TransactionService = TransactionService;
