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
exports.SecondPartyService = void 0;
const repositories_1 = require("../repositories");
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class SecondPartyService {
    createSecondParty(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if bank exists
                const bank = yield repositories_1.bankRepository.findById(data.bankId);
                if (!bank) {
                    throw new errors_1.NotFoundError('Bank not found');
                }
                // Check if second party with same name and bank already exists
                const existingSecondParty = yield repositories_1.secondPartyRepository.findByNameAndBankId(data.name, data.bankId);
                if (existingSecondParty) {
                    throw new errors_1.ConflictError('Second party with this name already exists for this bank');
                }
                return yield repositories_1.secondPartyRepository.create(data);
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to create second party');
            }
        });
    }
    getSecondPartyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secondParty = yield repositories_1.secondPartyRepository.findById(id, {
                    include: ['bank'],
                });
                if (!secondParty) {
                    throw new errors_1.NotFoundError('Second party not found');
                }
                return secondParty;
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to fetch second party');
            }
        });
    }
    getSecondPartiesByBankId(bankId_1) {
        return __awaiter(this, arguments, void 0, function* (bankId, page = 1, limit = 10) {
            try {
                const bank = yield repositories_1.bankRepository.findById(bankId);
                if (!bank) {
                    throw new errors_1.NotFoundError('Bank not found');
                }
                const offset = (page - 1) * limit;
                const secondParties = yield repositories_1.secondPartyRepository.findByBankId(bankId, {
                    limit,
                    offset,
                    order: [['name', 'ASC']],
                    include: ['bank'],
                });
                const totalCount = yield repositories_1.secondPartyRepository.findAndCountAll({
                    where: { bankId },
                });
                return {
                    secondParties,
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
                throw new errors_1.InternalServerError('Failed to fetch second parties');
            }
        });
    }
    getAllSecondParties() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const offset = (page - 1) * limit;
                const { count, rows } = yield repositories_1.secondPartyRepository.findAndCountAll({
                    limit,
                    offset,
                    order: [['name', 'ASC']],
                    include: ['bank'],
                });
                return {
                    secondParties: rows,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(count / limit),
                        totalItems: count,
                        itemsPerPage: limit,
                    },
                };
            }
            catch (error) {
                throw new errors_1.InternalServerError('Failed to fetch second parties');
            }
        });
    }
    updateSecondParty(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secondParty = yield repositories_1.secondPartyRepository.findById(id);
                if (!secondParty) {
                    throw new errors_1.NotFoundError('Second party not found');
                }
                // Check if bank exists if bankId is being updated
                if (data.bankId) {
                    const bank = yield repositories_1.bankRepository.findById(data.bankId);
                    if (!bank) {
                        throw new errors_1.NotFoundError('Bank not found');
                    }
                }
                // Check if another second party with the same name and bank exists
                if (data.name) {
                    const bankId = data.bankId || secondParty.bankId;
                    const existingSecondParty = yield repositories_1.secondPartyRepository.findByNameAndBankId(data.name, bankId);
                    if (existingSecondParty && existingSecondParty.id !== id) {
                        throw new errors_1.ConflictError('Another second party with this name already exists for this bank');
                    }
                }
                const [affectedCount, updatedSecondParties] = yield repositories_1.secondPartyRepository.update(id, data);
                if (affectedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to update second party');
                }
                return updatedSecondParties[0];
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to update second party');
            }
        });
    }
    deleteSecondParty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secondParty = yield repositories_1.secondPartyRepository.findById(id);
                if (!secondParty) {
                    throw new errors_1.NotFoundError('Second party not found');
                }
                const deletedCount = yield repositories_1.secondPartyRepository.delete(id);
                if (deletedCount === 0) {
                    throw new errors_1.InternalServerError('Failed to delete second party');
                }
                return { message: 'Second party deleted successfully' };
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to delete second party');
            }
        });
    }
    bulkCreateSecondPartiesFromForm(secondPartiesData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!secondPartiesData || secondPartiesData.length === 0) {
                    throw new errors_1.ValidationError('No second party data provided');
                }
                // Validate all bank IDs exist
                const bankIds = [...new Set(secondPartiesData.map(sp => sp.bankId))];
                const banks = yield repositories_1.bankRepository.findAll({
                    where: { id: bankIds },
                });
                if (banks.length !== bankIds.length) {
                    throw new errors_1.ValidationError('One or more bank IDs are invalid');
                }
                return yield repositories_1.secondPartyRepository.bulkCreate(secondPartiesData);
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to bulk create second parties');
            }
        });
    }
    bulkCreateSecondPartiesFromExcel(fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secondPartiesData = yield (0, helpers_1.parseExcelFile)(fileBuffer);
                if (!secondPartiesData || secondPartiesData.length === 0) {
                    throw new errors_1.ValidationError('No valid second party data found in Excel file');
                }
                // Validate and transform Excel data
                const validatedSecondParties = secondPartiesData.map((secondParty) => {
                    if (!secondParty.name || !secondParty.details || !secondParty.bank_id) {
                        throw new errors_1.ValidationError('Excel file must contain name, details, and bank_id columns');
                    }
                    return {
                        name: secondParty.name,
                        details: secondParty.details,
                        bankId: parseInt(secondParty.bank_id),
                    };
                });
                // Validate all bank IDs exist
                const bankIds = [...new Set(validatedSecondParties.map(sp => sp.bankId))];
                const banks = yield repositories_1.bankRepository.findAll({
                    where: { id: bankIds },
                });
                if (banks.length !== bankIds.length) {
                    throw new errors_1.ValidationError('One or more bank IDs in Excel file are invalid');
                }
                return yield repositories_1.secondPartyRepository.bulkCreate(validatedSecondParties);
            }
            catch (error) {
                if (error instanceof errors_1.AppError)
                    throw error;
                throw new errors_1.InternalServerError('Failed to bulk create second parties from Excel');
            }
        });
    }
}
exports.SecondPartyService = SecondPartyService;
