"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHolder = void 0;
const sequelize_1 = require("sequelize");
class AccountHolder extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const AccountHolder = this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            dateOfBirth: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            address: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            ssn: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [9, 9],
                },
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'account_holders',
            sequelize,
        });
        return AccountHolder;
    }
    // Associations
    static associate(models) {
        AccountHolder.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        AccountHolder.hasMany(models.CheckingAccount, {
            foreignKey: 'accountHolderId',
            as: 'checkingAccounts',
        });
        AccountHolder.hasMany(models.FixedTermDeposit, {
            foreignKey: 'accountHolderId',
            as: 'fixedTermDeposits',
        });
    }
}
exports.AccountHolder = AccountHolder;
exports.default = AccountHolder;
