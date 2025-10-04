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
exports.CheckingAccountRepository = void 0;
const checkingAccount_1 = require("../models/checkingAccount");
const baseRepository_1 = require("./baseRepository");
class CheckingAccountRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(checkingAccount_1.CheckingAccount);
    }
    findByAccountNumber(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ accountNumber });
        });
    }
    findByAccountHolderId(accountHolderId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll(Object.assign({ where: { accountHolderId } }, options));
        });
    }
    findByIdWithDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = [
                {
                    association: 'accountHolder',
                    include: [{
                            association: 'user',
                        }],
                },
                {
                    association: 'transactions',
                    limit: 10,
                    order: [['createdAt', 'DESC']],
                },
            ];
            return yield this.findById(id, { include });
        });
    }
    updateBalance(id, amount, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.findById(id);
                if (!account) {
                    throw new Error('Account not found');
                }
                const newBalance = parseFloat(account.balance.toString()) + amount;
                if (newBalance < 0) {
                    throw new Error('Insufficient funds');
                }
                return yield this.update(id, { balance: newBalance }, transaction);
            }
            catch (error) {
                throw new Error(`Error updating balance: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.CheckingAccountRepository = CheckingAccountRepository;
