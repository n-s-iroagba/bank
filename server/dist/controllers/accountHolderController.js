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
exports.deleteAccountHolder = exports.updateAccountHolder = exports.getAllAccountHolders = exports.getAccountHolder = exports.createAccountHolder = void 0;
const services_1 = require("../services");
const apiResponse_1 = require("../utils/apiResponse");
const createAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountHolder = yield services_1.accountHolderService.createAccountHolder(req.body);
        (0, apiResponse_1.successResponse)(res, 'Account holder created successfully', accountHolder, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createAccountHolder = createAccountHolder;
const getAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const accountHolder = yield services_1.accountHolderService.getAccountHolderById(Number(id));
        (0, apiResponse_1.successResponse)(res, 'Account holder retrieved successfully', accountHolder);
    }
    catch (error) {
        next(error);
    }
});
exports.getAccountHolder = getAccountHolder;
const getAllAccountHolders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.accountHolderService.getAllAccountHolders(page, limit);
        (0, apiResponse_1.successResponse)(res, 'Account holders retrieved successfully', result.accountHolders, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAccountHolders = getAllAccountHolders;
const updateAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const accountHolder = yield services_1.accountHolderService.updateAccountHolder(Number(id), req.body);
        (0, apiResponse_1.successResponse)(res, 'Account holder updated successfully', accountHolder);
    }
    catch (error) {
        next(error);
    }
});
exports.updateAccountHolder = updateAccountHolder;
const deleteAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield services_1.accountHolderService.deleteAccountHolder(Number(id));
        (0, apiResponse_1.successResponse)(res, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAccountHolder = deleteAccountHolder;
