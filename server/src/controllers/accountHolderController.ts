import { Request, Response, NextFunction } from 'express';
import { accountHolderService } from '../services';
import { successResponse } from '../utils/apiResponse';


export const createAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accountHolder = await accountHolderService.createAccountHolder(req.body);
    successResponse(res, 'Account holder created successfully', accountHolder, 201);
  } catch (error) {
    next(error);
  }
};

export const getAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const accountHolder = await accountHolderService.getAccountHolderById(Number(id));
    successResponse(res, 'Account holder retrieved successfully', accountHolder);
  } catch (error) {
    next(error);
  }
};

export const getAllAccountHolders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await accountHolderService.getAllAccountHolders(page, limit);
    successResponse(res, 'Account holders retrieved successfully', result.accountHolders, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const updateAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const accountHolder = await accountHolderService.updateAccountHolder(Number(id), req.body);
    successResponse(res, 'Account holder updated successfully', accountHolder);
  } catch (error) {
    next(error);
  }
};

export const deleteAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await accountHolderService.deleteAccountHolder(Number(id));
    successResponse(res, result.message);
  } catch (error) {
    next(error);
  }
};