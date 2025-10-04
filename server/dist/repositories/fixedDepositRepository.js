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
exports.FixedDepositRepository = void 0;
const fixedTermDeposit_1 = require("../models/fixedTermDeposit");
const baseRepository_1 = require("./baseRepository");
class FixedDepositRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(fixedTermDeposit_1.FixedTermDeposit);
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
    findActiveDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({
                where: { isActive: true },
                order: [['maturityDate', 'ASC']],
            });
        });
    }
    findMatureDeposits() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            return yield this.findAll({
                where: {
                    isActive: true,
                    maturityDate: { [Symbol.for('lte')]: currentDate },
                },
            });
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
            ];
            return yield this.findById(id, { include });
        });
    }
}
exports.FixedDepositRepository = FixedDepositRepository;
