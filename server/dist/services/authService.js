"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const user_1 = __importStar(require("../models/user"));
const errors_1 = require("../utils/errors");
const PasswordService_1 = require("./PasswordService");
const UserService_1 = require("./UserService");
const VerificationService_1 = require("./VerificationService");
const emailService_1 = __importDefault(require("./emailService"));
const _1 = require(".");
const accountHolderService = new _1.AccountHolderService();
const userService = new UserService_1.UserService();
const verificationService = new VerificationService_1.VerificationService();
class AuthService {
    /**
     * Registers a new user and initiates email verification.
     * @param data - User sign-up data.
     * @param roles - Optional array of user roles.
     * @returns Sign-up response with verification token.
     */
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Sign up process started', { email: data.email });
                const hashedPassword = yield PasswordService_1.PasswordService.hashPassword(data.password);
                const user = yield userService.createUser(Object.assign(Object.assign({}, data), { password: hashedPassword }));
                const result = yield verificationService.generateVerificationDetails(user);
                logger_1.default.info('Sign up completed successfully', { userId: user.id });
                return { result, user };
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Sign up', { email: data.email }, error);
            }
        });
    }
    /**
     * Logs a user in by validating credentials and returning tokens.
     * @param data - Login DTO containing email and password.
     * @returns LoginAuthServiceReturn or SignUpResponseDto for unverified users.
     */
    loginAccountHolder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Login attempt started', { email: data.username });
                const user = yield user_1.default.findOne({
                    where: {
                        username: data.username
                    }
                });
                console.log('PASSWORD', user === null || user === void 0 ? void 0 : user.password);
                // await this.validatePassword(user, data.password)
                if (!user) {
                    throw new errors_1.NotFoundError('user not found');
                }
                if (data.password !== user.password) {
                    throw new errors_1.BadRequestError('invalid credentials');
                }
                const accHolder = yield accountHolderService.getAccountHolderById(user.id);
                if (!accHolder) {
                    throw new errors_1.NotFoundError('account holder not found');
                }
                const { accessToken, refreshToken } = this.generateTokenPair(user);
                logger_1.default.info('Login successful', { userId: user === null || user === void 0 ? void 0 : user.id });
                const returnUser = { username: accHolder.firstName, role: user_1.Role.ACCOUNT_HOLDER, id: accHolder.id };
                user.refreshToken = refreshToken;
                yield user.save();
                return { user: returnUser, accessToken, refreshToken };
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Login', { email: data.username }, error);
            }
        });
    }
    /**
     * Logs a user in by validating credentials and returning tokens.
     * @param data - Login DTO containing email and password.
     * @returns LoginAuthServiceReturn or SignUpResponseDto for unverified users.
     */
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Login attempt started', { email: data.email });
                const user = yield userService.findUserByEmail(data.email, true);
                console.log('PASSWORD', user === null || user === void 0 ? void 0 : user.password);
                // await this.validatePassword(user, data.password)
                if (!user) {
                    throw new errors_1.NotFoundError('user not found');
                }
                if (data.password !== user.password) {
                    throw new errors_1.BadRequestError('invalid credentials');
                }
                // if (!user.isEmailVerified) {
                //   logger.warn('Login attempted by unverified user', { userId: user.id })
                //   const { verificationToken } =
                //     await verificationService.generateVerificationDetails(user)
                //   return { id: user.id, verificationToken }
                // }
                const { accessToken, refreshToken } = this.generateTokenPair(user);
                logger_1.default.info('Login successful', { userId: user === null || user === void 0 ? void 0 : user.id });
                const returnUser = Object.assign({}, user.get({ plain: true }));
                user.refreshToken = refreshToken;
                yield user.save();
                return { user: returnUser, accessToken, refreshToken };
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Login', { email: data.email }, error);
            }
        });
    }
    /**
     * Issues a new access token from a refresh token.
     * @param refreshToken - JWT refresh token.
     * @returns Object containing a new access token.
     */
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Token refresh attempted');
                const { decoded } = VerificationService_1.tokenService.verifyToken(refreshToken, 'refresh');
                if (!decoded.AdminId) {
                    logger_1.default.warn('Invalid refresh token provided');
                    throw new errors_1.BadRequestError('Invalid refresh token');
                }
                const user = yield userService.findUserById(decoded.AdminId);
                const newAccessToken = VerificationService_1.tokenService.generateAccessToken(user);
                logger_1.default.info('Token refreshed successfully', { userId: user.id });
                return { accessToken: newAccessToken };
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Token refresh', {}, error);
            }
        });
    }
    /**
     * Verifies a user's email using a token and code.
     * @param data - DTO containing token and verification code.
     * @returns Auth tokens for the verified user.
     */
    verifyEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Email verification started');
                const { decoded } = VerificationService_1.tokenService.verifyToken(data.verificationToken, 'email_verification');
                console.log(decoded);
                const userId = decoded.AdminId;
                if (!userId) {
                    logger_1.default.warn('Invalid verification token provided');
                    throw new errors_1.BadRequestError('Unsuitable token');
                }
                const user = yield userService.findUserById(userId);
                verificationService.validateVerificationCode(user, data.verificationCode);
                yield userService.markUserAsVerified(user);
                const { accessToken, refreshToken } = this.generateTokenPair(user);
                logger_1.default.info('Email verification successful', { userId: user.id });
                const returnUser = Object.assign({}, user.get({ plain: true }));
                user.refreshToken = refreshToken;
                yield user.save();
                return { user: returnUser, accessToken, refreshToken };
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Email verification', {}, error);
            }
        });
    }
    /**
     * Generates a new email verification code.
     * @param token - JWT token associated with the verification.
     * @returns A new verification code string.
     */
    generateNewCode(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('New verification code generation requested');
                return yield verificationService.regenerateVerificationCode(id, token);
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('New code generation', {}, error);
            }
        });
    }
    /**
     * Sends a password reset email to the user.
     * @param email - User's email address.
     */
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Password reset requested', { email });
                const user = yield userService.findUserByEmail(email);
                if (!user) {
                    logger_1.default.error('Password reset requested for non-existent email', { email });
                    throw new errors_1.NotFoundError('user for forgot password not found');
                }
                const { token, hashedToken } = PasswordService_1.PasswordService.generateResetToken();
                yield userService.setPasswordResetDetails(user, hashedToken);
                yield emailService_1.default.sendPasswordResetEmail(user.email, token);
                logger_1.default.info('Password reset email sent', { userId: user.id });
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Password reset', { email }, error);
            }
        });
    }
    /**
     * Resets the user's password using the reset token.
     * @param data - DTO with new password and reset token.
     * @returns New auth tokens.
     */
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Password reset process started');
                const user = yield userService.findUserByResetToken(data.resetPasswordToken);
                const hashedPassword = yield PasswordService_1.PasswordService.hashPassword(data.password);
                yield userService.updateUserPassword(user, hashedPassword);
                const { accessToken, refreshToken } = this.generateTokenPair(user);
                logger_1.default.info('Password reset successful', { userId: user.id });
                return this.saveRefreshTokenAndReturn(user, accessToken, refreshToken);
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Password reset', {}, error);
            }
        });
    }
    /**
     * Retrieves a user by ID.
     * @param userId - ID of the user.
     * @returns User object.
     */
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Get user by ID requested', { userId });
                const user = yield userService.findUserById(userId);
                logger_1.default.info('User retrieved successfully', { userId: user.id });
                return user;
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Get user by ID', { userId }, error);
            }
        });
    }
    /**
     * Returns the current authenticated user's details.
     * @param userId - Authenticated user's ID.
     * @returns User object.
     */
    getMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Get current user requested', { userId });
                const user = yield userService.findUserById(userId);
                let authUser = {
                    id: 0,
                    username: '',
                    role: user.role
                };
                if (user.role === user_1.Role.ACCOUNT_HOLDER) {
                    const accHolder = yield accountHolderService.getAccountHolderById(user.id);
                    if (!accHolder) {
                        throw new errors_1.NotFoundError('account holder not found');
                    }
                    authUser.id = accHolder.id;
                    authUser.username = accHolder.firstName;
                }
                else {
                    authUser = user;
                }
                logger_1.default.info('Current user retrieved successfully', { userId });
                return authUser;
            }
            catch (error) {
                console.error(error);
                return this.handleAuthError('Get current user', { userId }, error);
            }
        });
    }
    /**
     * Compares the given password with the user's stored password.
     * @param user - User instance.
     * @param password - Plain text password to validate.
     */
    validatePassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield PasswordService_1.PasswordService.comparePasswords(password, user.password);
            if (!isMatch) {
                logger_1.default.warn('Password validation failed', { userId: user.id });
                throw new errors_1.BadRequestError('Invalid credentials');
            }
            logger_1.default.info('Password validated successfully', { userId: user.id });
        });
    }
    /**
     * Generates a new access/refresh token pair.
     * @param userId - ID of the user.
     * @returns Object containing access and refresh tokens.
     */
    generateTokenPair(user) {
        const accessToken = VerificationService_1.tokenService.generateAccessToken(user);
        const refreshToken = VerificationService_1.tokenService.generateRefreshToken(user);
        return { accessToken, refreshToken };
    }
    /**
     * Saves the refresh token on the user and returns the full auth response.
     * @param user - User instance.
     * @param accessToken - JWT access token.
     * @param refreshToken - JWT refresh token.
     * @returns Full login/auth return object.
     */
    saveRefreshTokenAndReturn(passedUser, accessToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            passedUser.refreshToken = refreshToken;
            yield passedUser.save();
            const user = Object.assign({}, passedUser);
            return { accessToken, user, refreshToken };
        });
    }
    /**
     * Unified error handler for all auth-related operations.
     * @param operation - Operation name for logging.
     * @param context - Additional context info.
     * @param error - Error caught during operation.
     * @throws Error - Re-throws the original error.
     */
    handleAuthError(operation, context, error) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.error(`${operation} failed`, Object.assign(Object.assign({}, context), { error }));
            throw error;
        });
    }
}
exports.AuthService = AuthService;
