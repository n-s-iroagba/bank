"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
class Transaction extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const Transaction = this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: sequelize_1.DataTypes.ENUM('debit', 'credit'),
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: false,
                validate: {
                    min: 0.01,
                },
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            checkingAccountId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'checking_accounts',
                    key: 'id',
                },
            },
            secondPartyId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'second_parties',
                    key: 'id',
                },
            },
            balanceAfter: {
                type: sequelize_1.DataTypes.DECIMAL(12, 2),
                allowNull: false,
            },
        }, {
            tableName: 'transactions',
            sequelize,
        });
        return Transaction;
    }
    // Associations
    static associate(models) {
        Transaction.belongsTo(models.CheckingAccount, {
            foreignKey: 'checkingAccountId',
            as: 'checkingAccount',
        });
        Transaction.belongsTo(models.SecondParty, {
            foreignKey: 'secondPartyId',
            as: 'secondParty',
        });
    }
}
exports.Transaction = Transaction;
exports.default = Transaction;
