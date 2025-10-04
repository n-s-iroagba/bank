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
exports.BankRepository = void 0;
const bank_1 = require("../models/bank");
const baseRepository_1 = require("./baseRepository");
class BankRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(bank_1.Bank);
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ name });
        });
    }
    bulkCreate(banks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bank_1.Bank.bulkCreate(banks);
            }
            catch (error) {
                throw new Error(`Error bulk creating banks: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.BankRepository = BankRepository;
