"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof errors_1.AppError) {
        return (0, apiResponse_1.errorResponse)(res, error.message, error.statusCode);
    }
    console.error(error);
    logger_1.default.error("Unexpected error:", error);
    const message = process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message;
    return (0, apiResponse_1.errorResponse)(res, message, 500);
};
exports.errorHandler = errorHandler;
