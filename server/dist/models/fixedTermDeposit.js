"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedTermDeposit = void 0;
const sequelize_1 = require("sequelize");
const helpers_1 = require("../utils/helpers");
class FixedTermDeposit extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const FixedTermDeposit = this.init({
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
            term: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                },
            },
            interestRate: {
                type: sequelize_1.DataTypes.DECIMAL(5, 2),
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            maturityDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
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
            tableName: 'fixed_term_deposits',
            sequelize,
            hooks: {
                beforeValidate: (fixedTermDeposit) => {
                    if (fixedTermDeposit.term && fixedTermDeposit.createdAt) {
                        const maturityDate = new Date(fixedTermDeposit.createdAt);
                        maturityDate.setMonth(maturityDate.getMonth() + fixedTermDeposit.term);
                        fixedTermDeposit.maturityDate = maturityDate;
                    }
                },
            },
        });
        return FixedTermDeposit;
    }
    // Associations
    static associate(models) {
        FixedTermDeposit.belongsTo(models.AccountHolder, {
            foreignKey: 'accountHolderId',
            as: 'accountHolder',
        });
    }
}
exports.FixedTermDeposit = FixedTermDeposit;
exports.default = FixedTermDeposit;
