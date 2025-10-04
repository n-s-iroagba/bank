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
exports.BankController = void 0;
const services_1 = require("../services");
class BankController {
    createBank(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield services_1.bankService.createBank(req.body);
                res.status(201).json(bank);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    getBankById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield services_1.bankService.getBankById(Number(req.params.id));
                res.json(bank);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    getAllBanks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const result = yield services_1.bankService.getAllBanks(Number(page), Number(limit));
                res.json(result);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    updateBank(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield services_1.bankService.updateBank(Number(req.params.id), req.body);
                res.json(bank);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    deleteBank(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services_1.bankService.deleteBank(Number(req.params.id));
                res.json(result);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    bulkCreateBanksFromForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banks = yield services_1.bankService.bulkCreateBanksFromForm(req.body);
                res.status(201).json(banks);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
    bulkCreateBanksFromExcel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ message: "Excel file is required" });
                }
                const banks = yield services_1.bankService.bulkCreateBanksFromExcel(req.file.buffer);
                res.status(201).json(banks);
            }
            catch (error) {
                console.error(error);
                next(error);
            }
        });
    }
}
exports.BankController = BankController;
