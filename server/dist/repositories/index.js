"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = exports.FixedDepositRepository = exports.CheckingAccountRepository = exports.AccountHolderRepository = exports.SecondPartyRepository = exports.BankRepository = exports.transactionRepository = exports.fixedDepositRepository = exports.checkingAccountRepository = exports.accountHolderRepository = exports.secondPartyRepository = exports.userRepository = exports.bankRepository = void 0;
const bankRepository_1 = require("./bankRepository");
Object.defineProperty(exports, "BankRepository", { enumerable: true, get: function () { return bankRepository_1.BankRepository; } });
const secondPartyRepository_1 = require("./secondPartyRepository");
Object.defineProperty(exports, "SecondPartyRepository", { enumerable: true, get: function () { return secondPartyRepository_1.SecondPartyRepository; } });
const accountHolderRepository_1 = require("./accountHolderRepository");
Object.defineProperty(exports, "AccountHolderRepository", { enumerable: true, get: function () { return accountHolderRepository_1.AccountHolderRepository; } });
const checkingAccountRepository_1 = require("./checkingAccountRepository");
Object.defineProperty(exports, "CheckingAccountRepository", { enumerable: true, get: function () { return checkingAccountRepository_1.CheckingAccountRepository; } });
const fixedDepositRepository_1 = require("./fixedDepositRepository");
Object.defineProperty(exports, "FixedDepositRepository", { enumerable: true, get: function () { return fixedDepositRepository_1.FixedDepositRepository; } });
const transactionRepository_1 = require("./transactionRepository");
Object.defineProperty(exports, "TransactionRepository", { enumerable: true, get: function () { return transactionRepository_1.TransactionRepository; } });
const userRepository_1 = __importDefault(require("./userRepository"));
// Initialize all repositories
exports.bankRepository = new bankRepository_1.BankRepository();
exports.userRepository = new userRepository_1.default();
exports.secondPartyRepository = new secondPartyRepository_1.SecondPartyRepository();
exports.accountHolderRepository = new accountHolderRepository_1.AccountHolderRepository();
exports.checkingAccountRepository = new checkingAccountRepository_1.CheckingAccountRepository();
exports.fixedDepositRepository = new fixedDepositRepository_1.FixedDepositRepository();
exports.transactionRepository = new transactionRepository_1.TransactionRepository();
