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
exports.deleteCheckingAccount = exports.updateCheckingAccount = exports.getAllCheckingAccounts = exports.getCheckingAccountsByAccountHolder = exports.getCheckingAccount = exports.createCheckingAccount = void 0;
const services_1 = require("../services");
const apiResponse_1 = require("../utils/apiResponse");
const createCheckingAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkingAccount = yield services_1.checkingAccountService.createCheckingAccount(req.body);
        (0, apiResponse_1.successResponse)(res, 'Checking account created successfully', checkingAccount, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createCheckingAccount = createCheckingAccount;
const getCheckingAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const checkingAccount = yield services_1.checkingAccountService.getCheckingAccountById(Number(id));
        (0, apiResponse_1.successResponse)(res, 'Checking account retrieved successfully', checkingAccount);
    }
    catch (error) {
        next(error);
    }
});
exports.getCheckingAccount = getCheckingAccount;
const getCheckingAccountsByAccountHolder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountHolderId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.checkingAccountService.getCheckingAccountsByAccountHolderId(Number(accountHolderId), page, limit);
        (0, apiResponse_1.successResponse)(res, 'Checking accounts retrieved successfully', result.checkingAccounts, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getCheckingAccountsByAccountHolder = getCheckingAccountsByAccountHolder;
const getAllCheckingAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.checkingAccountService.getAllCheckingAccounts(page, limit);
        (0, apiResponse_1.successResponse)(res, 'Checking accounts retrieved successfully', result.checkingAccounts, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCheckingAccounts = getAllCheckingAccounts;
const updateCheckingAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const checkingAccount = yield services_1.checkingAccountService.updateCheckingAccount(Number(id), req.body);
        (0, apiResponse_1.successResponse)(res, 'Checking account updated successfully', checkingAccount);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCheckingAccount = updateCheckingAccount;
const deleteCheckingAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield services_1.checkingAccountService.deleteCheckingAccount(Number(id));
        (0, apiResponse_1.successResponse)(res, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCheckingAccount = deleteCheckingAccount;
