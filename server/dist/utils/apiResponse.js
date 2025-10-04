"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenResponse = exports.unauthorizedResponse = exports.notFoundResponse = exports.validationErrorResponse = exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message, data, pagination, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
        pagination,
    };
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 500, errors) => {
    const response = {
        success: false,
        message,
    };
    return res.status(statusCode).json(Object.assign(Object.assign({}, response), (errors && { errors })));
};
exports.errorResponse = errorResponse;
const validationErrorResponse = (res, message = 'Validation failed', errors) => {
    return (0, exports.errorResponse)(res, message, 422, errors);
};
exports.validationErrorResponse = validationErrorResponse;
const notFoundResponse = (res, resource = 'Resource') => {
    return (0, exports.errorResponse)(res, `${resource} not found`, 404);
};
exports.notFoundResponse = notFoundResponse;
const unauthorizedResponse = (res, message = 'Unauthorized access') => {
    return (0, exports.errorResponse)(res, message, 401);
};
exports.unauthorizedResponse = unauthorizedResponse;
const forbiddenResponse = (res, message = 'Access forbidden') => {
    return (0, exports.errorResponse)(res, message, 403);
};
exports.forbiddenResponse = forbiddenResponse;
