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
exports.AccountHolderRepository = void 0;
const accountHolder_1 = require("../models/accountHolder");
const baseRepository_1 = require("./baseRepository");
class AccountHolderRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(accountHolder_1.AccountHolder);
    }
    findByUserId(userId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ userId }, options);
        });
    }
    findBySsn(ssn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ ssn });
        });
    }
    findAllWithUserDetails(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = [
            // {
            //   association: 'user',
            //   attributes: ['email', 'role', 'isActive', 'lastLogin'],
            // },
            ];
            return yield this.findAll(Object.assign({ include }, options));
        });
    }
    findByIdWithDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = [
            // {
            //   association: 'user',
            //   attributes: ['email', 'role', 'isActive', 'lastLogin'],
            // },
            // {
            //   association: 'checkingAccounts',
            //   attributes: ['id', 'accountNumber', 'balance', 'isActive'],
            // },
            // {
            //   association: 'fixedTermDeposits',
            //   attributes: ['id', 'accountNumber', 'balance', 'term', 'interestRate', 'maturityDate', 'isActive'],
            // },
            ];
            return yield this.findById(id, { include });
        });
    }
}
exports.AccountHolderRepository = AccountHolderRepository;
