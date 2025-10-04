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
exports.bulkCreateSecondPartiesFromExcel = exports.bulkCreateSecondPartiesFromForm = exports.deleteSecondParty = exports.updateSecondParty = exports.getAllSecondParties = exports.getSecondPartiesByBank = exports.getSecondParty = exports.createSecondParty = void 0;
const services_1 = require("../services");
const apiResponse_1 = require("../utils/apiResponse");
const errors_1 = require("../utils/errors");
const createSecondParty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secondParty = yield services_1.secondPartyService.createSecondParty(req.body);
        (0, apiResponse_1.successResponse)(res, 'Second party created successfully', secondParty, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createSecondParty = createSecondParty;
const getSecondParty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const secondParty = yield services_1.secondPartyService.getSecondPartyById(Number(id));
        (0, apiResponse_1.successResponse)(res, 'Second party retrieved successfully', secondParty);
    }
    catch (error) {
        next(error);
    }
});
exports.getSecondParty = getSecondParty;
const getSecondPartiesByBank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bankId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.secondPartyService.getSecondPartiesByBankId(Number(bankId), page, limit);
        (0, apiResponse_1.successResponse)(res, 'Second parties retrieved successfully', result.secondParties, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getSecondPartiesByBank = getSecondPartiesByBank;
const getAllSecondParties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.secondPartyService.getAllSecondParties(page, limit);
        (0, apiResponse_1.successResponse)(res, 'Second parties retrieved successfully', result.secondParties, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSecondParties = getAllSecondParties;
const updateSecondParty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const secondParty = yield services_1.secondPartyService.updateSecondParty(Number(id), req.body);
        (0, apiResponse_1.successResponse)(res, 'Second party updated successfully', secondParty);
    }
    catch (error) {
        next(error);
    }
});
exports.updateSecondParty = updateSecondParty;
const deleteSecondParty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield services_1.secondPartyService.deleteSecondParty(Number(id));
        (0, apiResponse_1.successResponse)(res, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSecondParty = deleteSecondParty;
const bulkCreateSecondPartiesFromForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secondParties = yield services_1.secondPartyService.bulkCreateSecondPartiesFromForm(req.body.secondParties);
        (0, apiResponse_1.successResponse)(res, 'Second parties created successfully', secondParties, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.bulkCreateSecondPartiesFromForm = bulkCreateSecondPartiesFromForm;
const bulkCreateSecondPartiesFromExcel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new errors_1.AppError('Excel file is required', 400);
        }
        const secondParties = yield services_1.secondPartyService.bulkCreateSecondPartiesFromExcel(req.file.buffer);
        (0, apiResponse_1.successResponse)(res, 'Second parties created successfully from Excel', secondParties, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.bulkCreateSecondPartiesFromExcel = bulkCreateSecondPartiesFromExcel;
