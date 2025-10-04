"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const user_1 = __importDefault(require("./user"));
const bank_1 = __importDefault(require("./bank"));
const secondParty_1 = __importDefault(require("./secondParty"));
const accountHolder_1 = __importDefault(require("./accountHolder"));
const checkingAccount_1 = __importDefault(require("./checkingAccount"));
const fixedTermDeposit_1 = __importDefault(require("./fixedTermDeposit"));
const transaction_1 = __importDefault(require("./transaction"));
// Initialize models
const models = {
    User: user_1.default.initialize(database_1.default),
    Bank: bank_1.default.initialize(database_1.default),
    SecondParty: secondParty_1.default.initialize(database_1.default),
    AccountHolder: accountHolder_1.default.initialize(database_1.default),
    CheckingAccount: checkingAccount_1.default.initialize(database_1.default),
    FixedTermDeposit: fixedTermDeposit_1.default.initialize(database_1.default),
    Transaction: transaction_1.default.initialize(database_1.default),
};
// ---------------- Associations ---------------- //
models.User.hasOne(models.AccountHolder, {
    foreignKey: 'userId',
    as: 'accountHolder'
});
models.AccountHolder.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
});
// AccountHolder → FixedTermDeposit (1:N)
models.AccountHolder.hasMany(models.FixedTermDeposit, {
    foreignKey: 'accountHolderId',
    as: 'fixedTermDeposits',
});
models.FixedTermDeposit.belongsTo(models.AccountHolder, {
    foreignKey: 'accountHolderId',
    as: 'accountHolder',
});
// AccountHolder → CheckingAccount (1:N)
models.AccountHolder.hasMany(models.CheckingAccount, {
    foreignKey: 'accountHolderId',
    as: 'checkingAccounts',
});
models.CheckingAccount.belongsTo(models.AccountHolder, {
    foreignKey: 'accountHolderId',
    as: 'accountHolder',
});
// CheckingAccount → Transaction (1:N)
models.CheckingAccount.hasMany(models.Transaction, {
    foreignKey: 'checkingAccountId',
    as: 'transactions',
});
models.Transaction.belongsTo(models.CheckingAccount, {
    foreignKey: 'checkingAccountId',
    as: 'checkingAccount',
});
// Transaction → SecondParty (1:1)
models.Transaction.belongsTo(models.SecondParty, {
    foreignKey: 'secondPartyId',
    as: 'secondParty',
});
models.SecondParty.hasOne(models.Transaction, {
    foreignKey: 'secondPartyId',
    as: 'transaction',
});
// SecondParty → Bank (1:1)
models.SecondParty.belongsTo(models.Bank, {
    foreignKey: 'bankId',
    as: 'bank',
});
models.Bank.hasOne(models.SecondParty, {
    foreignKey: 'bankId',
    as: 'secondParty',
});
exports.default = models;
