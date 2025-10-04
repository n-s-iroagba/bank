"use strict";
// services/verification.service.ts
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
exports.VerificationService = exports.tokenService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../config/logger"));
const errors_1 = require("../utils/errors");
const UserService_1 = require("./UserService");
const codeHelper_1 = require("../utils/codeHelper");
const TokenService_1 = require("./TokenService");
exports.tokenService = new TokenService_1.TokenService('udorakpuenyi');
dotenv_1.default.config();
class VerificationService {
    constructor() {
        this.userService = new UserService_1.UserService();
        this.tokenService = exports.tokenService;
    }
    generateVerificationDetails(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificationToken = this.tokenService.generateEmailVerificationToken(user);
                const verificationCode = process.env.NODE_ENV === 'production' ? codeHelper_1.CodeHelper.generateVerificationCode() : '123456';
                console.log('VVVV', verificationCode);
                yield this.userService.updateUserVerification(user, verificationCode, verificationToken);
                //await this.emailService.sendVerificationEmail(user)
                logger_1.default.info('Verification details generated successfully', { userId: user.id });
                return { verificationToken, id: user.id };
            }
            catch (error) {
                logger_1.default.error('Error generating verification details', { userId: user.id, error });
                throw error;
            }
        });
    }
    regenerateVerificationCode(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findUserById(id);
                if (user.verificationToken !== token)
                    throw new errors_1.BadRequestError('Token does not match');
                const { verificationToken } = yield this.generateVerificationDetails(user);
                //await this.emailService.sendVerificationEmail(user)
                logger_1.default.info('Verification code regenerated', { userId: user.id });
                return verificationToken;
            }
            catch (error) {
                logger_1.default.error('Error regenerating verification code', { error });
                throw error;
            }
        });
    }
    validateVerificationCode(user, code) {
        console.log(user);
        if (user.verificationCode !== code) {
            logger_1.default.warn('Invalid verification code provided', { userId: user.id });
            throw new errors_1.ForbiddenError('Invalid verification code');
        }
        logger_1.default.info('Verification code validated successfully', { userId: user.id });
    }
}
exports.VerificationService = VerificationService;
