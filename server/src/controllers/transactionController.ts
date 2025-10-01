import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services';
import { successResponse } from '../utils/apiResponse';
import { AppError } from '../utils/errors';


export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    successResponse(res, 'Transaction created successfully', transaction, 201);
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(Number(id));
    successResponse(res, 'Transaction retrieved successfully', transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsByCheckingAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { checkingAccountId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await transactionService.getTransactionsByCheckingAccountId(
      Number(checkingAccountId), 
      page, 
      limit
    );
    successResponse(res, 'Transactions retrieved successfully', result.transactions, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await transactionService.getAllTransactions(page, limit);
    successResponse(res, 'Transactions retrieved successfully', result.transactions, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.updateTransaction(Number(id), req.body);
    successResponse(res, 'Transaction updated successfully', transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await transactionService.deleteTransaction(Number(id));
    successResponse(res, result.message);
  } catch (error) {
    next(error);
  }
};

export const getAccountStatement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { checkingAccountId } = req.params;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      throw new AppError('Start date and end date are required', 400);
    }
    
    const statement = await transactionService.getAccountStatement(
      Number(checkingAccountId),
      new Date(startDate as string),
      new Date(endDate as string)
    );
    
    successResponse(res, 'Account statement retrieved successfully', statement);
  } catch (error) {
    next(error);
  }
};