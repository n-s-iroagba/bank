"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const notFound = (req, res, next) => {
    (0, apiResponse_1.errorResponse)(res, `Route ${req.originalUrl} not found`, 404);
};
exports.notFound = notFound;
