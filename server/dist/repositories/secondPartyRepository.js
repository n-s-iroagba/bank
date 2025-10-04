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
exports.SecondPartyRepository = void 0;
const secondParty_1 = require("../models/secondParty");
const baseRepository_1 = require("./baseRepository");
class SecondPartyRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(secondParty_1.SecondParty);
    }
    findByBankId(bankId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll(Object.assign({ where: { bankId } }, options));
        });
    }
    findByNameAndBankId(name, bankId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ name, bankId });
        });
    }
    bulkCreate(secondParties) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield secondParty_1.SecondParty.bulkCreate(secondParties);
            }
            catch (error) {
                throw new Error(`Error bulk creating second parties: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.SecondPartyRepository = SecondPartyRepository;
