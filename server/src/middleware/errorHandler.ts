import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errors";
import logger from "../config/logger";

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return errorResponse(res, error.message, error.statusCode);
  }
  console.error(error)
  logger.error("Unexpected error:", error);

  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : error.message;

  return errorResponse(res, message, 500);
};
