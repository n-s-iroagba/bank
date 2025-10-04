"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondParty = void 0;
const sequelize_1 = require("sequelize");
class SecondParty extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const SecondParty = this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            details: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            bankId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'banks',
                    key: 'id',
                },
            },
        }, {
            tableName: 'second_parties',
            sequelize,
        });
        return SecondParty;
    }
    // Associations
    static associate(models) {
        SecondParty.belongsTo(models.Bank, {
            foreignKey: 'bankId',
            as: 'bank',
        });
        SecondParty.hasMany(models.Transaction, {
            foreignKey: 'secondPartyId',
            as: 'transactions',
        });
    }
}
exports.SecondParty = SecondParty;
exports.default = SecondParty;
