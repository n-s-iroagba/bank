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
exports.FixedDepositService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
class FixedDepositService {
    createFixedDeposit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if account holder exists
                const accountHolder = yield repositories_1.accountHolderRepository.findById(data.accountHolderId);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                // Calculate maturity date
                const maturityDate = new Date();
                maturityDate.setMonth(maturityDate.getMonth() + data.term);
                const fixedDepositData = Object.assign(Object.assign({}, data), { maturityDate });
                return yield repositories_1.fixedDepositRepository.create(fixedDepositData);
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create fixed deposit');
            }
        });
    }
    getFixedDepositById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fixedDeposit = yield repositories_1.fixedDepositRepository.findByIdWithDetails(id);
                if (!fixedDeposit) {
                    throw new errors_1.NotFoundError('Fixed deposit not found');
                }
                return fixedDeposit;
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch fixed deposit');
            }
        });
    }
    getFixedDepositsByAccountHolderId(accountHolderId_1) {
        return __awaiter(this, arguments, void 0, function* (accountHolderId, page = 1, limit = 10) {
            try {
                const accountHolder = yield repositories_1.accountHolderRepository.findById(accountHolderId);
                if (!accountHolder) {
                    throw new errors_1.NotFoundError('Account holder not found');
                }
                const offset = (page - 1) * limit;
                const fixedDeposits = yield repositories_1.fixedDepositRepository.findByAccountHolderId(accountHolderId, {
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                });
                const totalCount = yield repositories_1.fixedDepositRepository.findAndCountAll({
                    where: { accountHolderId },
                });
                return {
                    fixedDeposits,
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
                throw new errors_1.InternalServerError('Failed to fetch fixed deposits');
            }
        });
    }
    getAllFixedDeposits() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { count, rows } = yield repositories_1.fixedDepositRepository.findAndCountAll({
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
                    fixedDeposits: rows,
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
                throw new errors_1.InternalServerError('Failed to fetch fixed deposits');
            }
        });
    }
    updateFixedDeposit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fixedDeposit = yield repositories_1.fixedDepositRepository.findById(id);
                if (!fixedDeposit) {
                    throw new errors_1.NotFoundError('Fixed deposit not found');
                }
                // Check if account holder exists if accountHolderId is being updated
                if (data.accountHolderId) {
                    const accountHolder = yield repositories_1.accountHolderRepository.findById(data.accountHolderId);
                    if (!accountHolder) {
                        throw new errors_1.NotFoundError('Account holder not found');
                    }
                }
                // Recalculate maturity date if term is being updated
                if (data.term) {
                    const maturityDate = new Date(fixedDeposit.createdAt);
                    maturityDate.setMonth(maturityDate.getMonth() + data.term);
                    data.maturityDate = maturityDate;
                }
                const [affectedCount, updatedFixedDeposits] = yield repositories_1.fixedDepositRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update fixed deposit');
                }
                return updatedFixedDeposits[0];
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update fixed deposit');
            }
        });
    }
    deleteFixedDeposit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fixedDeposit = yield repositories_1.fixedDepositRepository.findById(id);
                if (!fixedDeposit) {
                    throw new errors_1.NotFoundError('Fixed deposit not found');
                }
                // Check if deposit has balance
                if (parseFloat(fixedDeposit.balance.toString()) > 0) {
                    throw new errors_1.ValidationError('Cannot delete fixed deposit with balance');
                }
                const deletedCount = yield repositories_1.fixedDepositRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete fixed deposit');
                }
                return { message: 'Fixed deposit deleted successfully' };
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete fixed deposit');
            }
        });
    }
    getMatureDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repositories_1.fixedDepositRepository.findMatureDeposits();
            }
            catch (error) {
                console.error(error);
                throw new errors_1.InternalServerError('Failed to fetch mature deposits');
            }
        });
    }
}
exports.FixedDepositService = FixedDepositService;
