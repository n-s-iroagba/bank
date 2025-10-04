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
exports.getAccountStatement = exports.deleteTransaction = exports.updateTransaction = exports.getAllTransactions = exports.getTransactionsByCheckingAccount = exports.getTransaction = exports.createTransaction = void 0;
const services_1 = require("../services");
const apiResponse_1 = require("../utils/apiResponse");
const errors_1 = require("../utils/errors");
const createTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield services_1.transactionService.createTransaction(req.body);
        (0, apiResponse_1.successResponse)(res, 'Transaction created successfully', transaction, 201);
    }
    catch (error) {
        next(error);
    }
});
exports.createTransaction = createTransaction;
const getTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield services_1.transactionService.getTransactionById(Number(id));
        (0, apiResponse_1.successResponse)(res, 'Transaction retrieved successfully', transaction);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransaction = getTransaction;
const getTransactionsByCheckingAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { checkingAccountId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.transactionService.getTransactionsByCheckingAccountId(Number(checkingAccountId), page, limit);
        (0, apiResponse_1.successResponse)(res, 'Transactions retrieved successfully', result.transactions, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsByCheckingAccount = getTransactionsByCheckingAccount;
const getAllTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = yield services_1.transactionService.getAllTransactions(page, limit);
        (0, apiResponse_1.successResponse)(res, 'Transactions retrieved successfully', result.transactions, result.pagination);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const updateTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield services_1.transactionService.updateTransaction(Number(id), req.body);
        (0, apiResponse_1.successResponse)(res, 'Transaction updated successfully', transaction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield services_1.transactionService.deleteTransaction(Number(id));
        (0, apiResponse_1.successResponse)(res, result.message);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTransaction = deleteTransaction;
const getAccountStatement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { checkingAccountId } = req.params;
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            throw new errors_1.AppError('Start date and end date are required', 400);
        }
        const statement = yield services_1.transactionService.getAccountStatement(Number(checkingAccountId), new Date(startDate), new Date(endDate));
        (0, apiResponse_1.successResponse)(res, 'Account statement retrieved successfully', statement);
    }
    catch (error) {
        next(error);
    }
});
exports.getAccountStatement = getAccountStatement;
