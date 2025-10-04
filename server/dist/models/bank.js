"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const sequelize_1 = require("sequelize");
class Bank extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        const Bank = this.init({
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
            logo: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        }, {
            tableName: 'banks',
            sequelize,
        });
        return Bank;
    }
    // Associations
    static associate(models) {
        Bank.hasMany(models.SecondParty, {
            foreignKey: 'bankId',
            as: 'secondParties',
        });
    }
}
exports.Bank = Bank;
exports.default = Bank;
