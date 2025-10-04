"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckingAccount = void 0;
const sequelize_1 = require("sequelize");
const helpers_1 = require("../utils/helpers");
class CheckingAccount extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const CheckingAccount = this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            accountNumber: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
                defaultValue: () => (0, helpers_1.generateAccountNumber)(),
            },
            balance: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: false,
                defaultValue: 0.0,
                validate: {
                    min: 0,
                },
            },
            accountHolderId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'account_holders',
                    key: 'id',
                },
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        }, {
            tableName: 'checking_accounts',
            sequelize,
        });
        return CheckingAccount;
    }
    // Associations
    static associate(models) {
        CheckingAccount.belongsTo(models.AccountHolder, {
            foreignKey: 'accountHolderId',
            as: 'accountHolder',
        });
        CheckingAccount.hasMany(models.Transaction, {
            foreignKey: 'checkingAccountId',
            as: 'transactions',
        });
    }
}
exports.CheckingAccount = CheckingAccount;
exports.default = CheckingAccount;
