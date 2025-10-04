import { Request, Response, NextFunction } from 'express';
import { checkingAccountService } from '../services';
import { successResponse, errorResponse } from '../utils/apiResponse';


export const createCheckingAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkingAccount = await checkingAccountService.createCheckingAccount(req.body);
    successResponse(res, 'Checking account created successfully', checkingAccount, 201);
  } catch (error) {
    next(error);
  }
};

export const getCheckingAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const checkingAccount = await checkingAccountService.getCheckingAccountById(Number(id));
    successResponse(res, 'Checking account retrieved successfully', checkingAccount);
  } catch (error) {
    next(error);
  }
};

export const getCheckingAccountsByAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountHolderId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await checkingAccountService.getCheckingAccountsByAccountHolderId(
      Number(accountHolderId), 
      page, 
      limit
    );
    successResponse(res, 'Checking accounts retrieved successfully', result.checkingAccounts,  result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getAllCheckingAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await checkingAccountService.getAllCheckingAccounts(page, limit);
    successResponse(res, 'Checking accounts retrieved successfully', result.checkingAccounts,  result.pagination);
  } catch (error) {
    next(error);
  }
};

export const updateCheckingAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const checkingAccount = await checkingAccountService.updateCheckingAccount(Number(id), req.body);
    successResponse(res, 'Checking account updated successfully', checkingAccount);
  } catch (error) {
    next(error);
  }
};

export const deleteCheckingAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await checkingAccountService.deleteCheckingAccount(Number(id));
    successResponse(res, result.message);
  } catch (error) {
    next(error);
  }
};