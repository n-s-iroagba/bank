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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../utils/errors"); // Adjust path as needed
const VerificationService_1 = require("../services/VerificationService");
const logger_1 = __importDefault(require("../config/logger"));
const user_1 = __importDefault(require("../models/user"));
// Main authentication middleware for login tokens
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        console.log('access token', token);
        const { decoded } = VerificationService_1.tokenService.verifyToken(token, 'access');
        const user = yield user_1.default.findByPk(decoded.id, {
            attributes: { exclude: ['password'] },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('User not found');
        }
        req.user = user;
        logger_1.default.info(`Authenticated user: ${user.email} (ID: ${user.id})`);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            logger_1.default.warn(`Token expired for user attempt`);
            return next(new errors_1.UnauthorizedError('Token expired'));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            logger_1.default.warn(`Invalid token attempt`);
            return next(new errors_1.UnauthorizedError('Invalid token'));
        }
        // If it's already one of our custom errors, pass it along
        if (error instanceof errors_1.UnauthorizedError || error instanceof errors_1.ForbiddenError) {
            return next(error);
        }
        logger_1.default.error('Authentication error:', error);
        return next(error);
    }
});
exports.authenticateToken = authenticateToken;
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new errors_1.UnauthorizedError('You do not have permission to access this resource');
        }
        next();
        return; // Explicit return for the success path
    };
};
exports.authorizeRoles = authorizeRoles;
