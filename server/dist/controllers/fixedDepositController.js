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
exports.getMatureDeposits = exports.deleteFixedDeposit = exports.updateFixedDeposit = exports.getAllFixedDeposits = exports.getFixedDepositsByAccountHolder = exports.getFixedDeposit = exports.createFixedDeposit = void 0;
const services_1 = require("../services");
const apiResponse_1 = require("../utils/apiResponse");
const createFixedDeposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fixedDeposit = yield services_1.fixedDepositService.createFixedDeposit(req.body);
        (0, apiResponse_1.successResponse)(res, 'Fixed deposit created successfully', fixedDeposit, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createFixedDeposit = createFixedDeposit;
const getFixedDeposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fixedDeposit = yield services_1.fixedDepositService.getFixedDepositById(Number(id));
        (0, apiResponse_1.successResponse)(res, 'Fixed deposit retrieved successfully', fixedDeposit);
    }
    catch (error) {
        next(error);
    }
});
exports.getFixedDeposit = getFixedDeposit;
const getFixedDepositsByAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountHolderId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.fixedDepositService.getFixedDepositsByAccountHolderId(Number(accountHolderId), page, limit);
        (0, apiResponse_1.successResponse)(res, 'Fixed deposits retrieved successfully', result.fixedDeposits, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getFixedDepositsByAccountHolder = getFixedDepositsByAccountHolder;
const getAllFixedDeposits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.fixedDepositService.getAllFixedDeposits(page, limit);
        (0, apiResponse_1.successResponse)(res, 'Fixed deposits retrieved successfully', result.fixedDeposits, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllFixedDeposits = getAllFixedDeposits;
const updateFixedDeposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fixedDeposit = yield services_1.fixedDepositService.updateFixedDeposit(Number(id), req.body);
        (0, apiResponse_1.successResponse)(res, 'Fixed deposit updated successfully', fixedDeposit);
    }
    catch (error) {
        next(error);
    }
});
exports.updateFixedDeposit = updateFixedDeposit;
const deleteFixedDeposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield services_1.fixedDepositService.deleteFixedDeposit(Number(id));
        (0, apiResponse_1.successResponse)(res, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFixedDeposit = deleteFixedDeposit;
const getMatureDeposits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matureDeposits = yield services_1.fixedDepositService.getMatureDeposits();
        (0, apiResponse_1.successResponse)(res, 'Mature deposits retrieved successfully', matureDeposits);
    }
    catch (error) {
        next(error);
    }
});
exports.getMatureDeposits = getMatureDeposits;
