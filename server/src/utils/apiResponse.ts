import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: any;
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  pagination?: any,
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    pagination,
  };
  
  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any[]
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    message,
  };
  
  return res.status(statusCode).json({
    ...response,
    ...(errors && { errors }),
  });
};

export const validationErrorResponse = (
  res: Response,
  message: string = 'Validation failed',
  errors: any[]
): Response => {
  return errorResponse(res, message, 422, errors);
};

export const notFoundResponse = (
  res: Response,
  resource: string = 'Resource'
): Response => {
  return errorResponse(res, `${resource} not found`, 404);
};

export const unauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized access'
): Response => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (
  res: Response,
  message: string = 'Access forbidden'
): Response => {
  return errorResponse(res, message, 403);
};