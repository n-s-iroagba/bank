import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};