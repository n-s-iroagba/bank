"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["ACCOUNT_HOLDER"] = "ACCOUNT_HOLDER";
})(Role || (exports.Role = Role = {}));
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        return User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            isEmailVerified: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            verificationToken: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true,
            },
            verificationCode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            googleId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            passwordResetToken: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true,
            },
            refreshToken: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(Role)),
                allowNull: false,
                defaultValue: Role.ACCOUNT_HOLDER,
            },
        }, {
            sequelize,
            tableName: 'users',
            paranoid: true, // soft delete enabled
            timestamps: true,
        });
    }
}
exports.default = User;
