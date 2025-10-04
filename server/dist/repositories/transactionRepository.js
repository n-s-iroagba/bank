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
exports.TransactionRepository = void 0;
const transaction_1 = require("../models/transaction");
const baseRepository_1 = require("./baseRepository");
class TransactionRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(transaction_1.Transaction);
    }
    findByCheckingAccountId(checkingAccountId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll(Object.assign({ where: { checkingAccountId }, order: [['createdAt', 'DESC']] }, options));
        });
    }
    findBySecondPartyId(secondPartyId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll(Object.assign({ where: { secondPartyId }, order: [['createdAt', 'DESC']] }, options));
        });
    }
    findByAccountHolderId(accountHolderId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = [
                {
                    association: 'checkingAccount',
                    where: { accountHolderId },
                    attributes: [],
                },
            ];
            return yield this.findAll(Object.assign({ include, order: [['createdAt', 'DESC']] }, options));
        });
    }
    findWithDetails(where, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = [
                {
                    association: 'checkingAccount',
                    attributes: ['accountNumber'],
                    include: [{
                            association: 'accountHolder',
                            attributes: ['firstName', 'lastName'],
                            include: [{
                                    association: 'user',
                                    attributes: ['email'],
                                }],
                        }],
                },
                {
                    association: 'secondParty',
                    attributes: ['name', 'details'],
                    include: [{
                            association: 'bank',
                            attributes: ['name', 'logo'],
                        }],
                },
            ];
            return yield this.findAll(Object.assign({ where,
                include, order: [['createdAt', 'DESC']] }, options));
        });
    }
    getAccountStatement(checkingAccountId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({
                where: {
                    checkingAccountId,
                    createdAt: {
                        [Symbol.for('between')]: [startDate, endDate],
                    },
                },
                order: [['createdAt', 'DESC']],
                include: [{
                        association: 'secondParty',
                        attributes: ['name'],
                    }],
            });
        });
    }
}
exports.TransactionRepository = TransactionRepository;
