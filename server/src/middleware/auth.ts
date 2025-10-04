import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


// Import your custom error classes
import { TokenService } from '../services/TokenService';
import { ForbiddenError,UnauthorizedError } from '../utils/errors'; // Adjust path as needed
import { tokenService } from '../services/VerificationService';
import logger from '../config/logger';
import User, { AuthUser } from '../models/user';


// Fix: Make user optional to match Express Request interface
export interface AuthenticatedRequest extends Request {
  user?: AuthUser // Changed from required to optional
}

// Main authentication middleware for login tokens
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    console.log('access token', token)
    const { decoded } = tokenService.verifyToken(token, 'access')
  

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      throw new UnauthorizedError('User not found')
    }

 

    req.user = user as unknown as AuthUser
    logger.info(`Authenticated user: ${user.email} (ID: ${user.id})`)
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger.warn(`Token expired for user attempt`)
      return next(new UnauthorizedError('Token expired'))
    }
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn(`Invalid token attempt`)
      return next(new UnauthorizedError('Invalid token'))
    }

    // If it's already one of our custom errors, pass it along
    if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return next(error)
    }

    logger.error('Authentication error:', error)
    return next(error)
  }
}
export const authorizeRoles = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
       throw new UnauthorizedError('You do not have permission to access this resource');
    }
    next();
    return; // Explicit return for the success path
  };
};







