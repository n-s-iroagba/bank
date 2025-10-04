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
exports.BankService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class BankService {
    createBank(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if bank with same name already exists
                const existingBank = yield repositories_1.bankRepository.findByName(data.name);
                if (existingBank) {
                    throw new errors_1.ConflictError('Bank with this name already exists');
                }
                return yield repositories_1.bankRepository.create(data);
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create bank');
            }
        });
    }
    getBankById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield repositories_1.bankRepository.findById(id);
                if (!bank) {
                    throw new errors_1.NotFoundError('Bank not found');
                }
                return bank;
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch bank');
            }
        });
    }
    getAllBanks() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { count, rows } = yield repositories_1.bankRepository.findAndCountAll({
                    limit,
                    offset,
                    order: [['name', 'ASC']],
                });
                return {
                    data: rows,
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
                throw new errors_1.InternalServerError('Failed to fetch banks');
            }
        });
    }
    updateBank(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield repositories_1.bankRepository.findById(id);
                if (!bank) {
                    throw new errors_1.NotFoundError('Bank not found');
                }
                // Check if another bank with the same name exists
                if (data.name) {
                    const existingBank = yield repositories_1.bankRepository.findByName(data.name);
                    if (existingBank && existingBank.id !== id) {
                        throw new errors_1.ConflictError('Another bank with this name already exists');
                    }
                }
                const [affectedCount, updatedBanks] = yield repositories_1.bankRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update bank');
                }
                return updatedBanks[0];
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update bank');
            }
        });
    }
    deleteBank(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield repositories_1.bankRepository.findById(id);
                if (!bank) {
                    throw new errors_1.NotFoundError('Bank not found');
                }
                const deletedCount = yield repositories_1.bankRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete bank');
                }
                return { message: 'Bank deleted successfully' };
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete bank');
            }
        });
    }
    bulkCreateBanksFromForm(banksData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!banksData || banksData.length === 0) {
                    throw new errors_1.ValidationError('No bank data provided');
                }
                return yield repositories_1.bankRepository.bulkCreate(banksData);
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to bulk create banks');
            }
        });
    }
    bulkCreateBanksFromExcel(fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banksData = yield (0, helpers_1.parseExcelFile)(fileBuffer);
                if (!banksData || banksData.length === 0) {
                    throw new errors_1.ValidationError('No valid bank data found in Excel file');
                }
                // Validate and transform Excel data
                const validatedBanks = banksData.map((bank) => {
                    if (!bank.name || !bank.logo) {
                        throw new errors_1.ValidationError('Excel file must contain name and logo columns');
                    }
                    return {
                        name: bank.name,
                        logo: bank.logo,
                    };
                });
                return yield repositories_1.bankRepository.bulkCreate(validatedBanks);
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to bulk create banks from Excel');
            }
        });
    }
}
exports.BankService = BankService;
