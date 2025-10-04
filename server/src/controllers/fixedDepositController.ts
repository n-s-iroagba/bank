import { Request, Response, NextFunction } from 'express';
import { fixedDepositService } from '../services';
import { successResponse } from '../utils/apiResponse';


export const createFixedDeposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fixedDeposit = await fixedDepositService.createFixedDeposit(req.body);
    successResponse(res, 'Fixed deposit created successfully', fixedDeposit, 201);
  } catch (error) {
    next(error);
  }
};

export const getFixedDeposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const fixedDeposit = await fixedDepositService.getFixedDepositById(Number(id));
    successResponse(res, 'Fixed deposit retrieved successfully', fixedDeposit);
  } catch (error) {
    next(error);
  }
};

export const getFixedDepositsByAccountHolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountHolderId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await fixedDepositService.getFixedDepositsByAccountHolderId(
      Number(accountHolderId), 
      page, 
      limit
    );
    successResponse(res, 'Fixed deposits retrieved successfully', result.fixedDeposits, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getAllFixedDeposits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await fixedDepositService.getAllFixedDeposits(page, limit);
    successResponse(res, 'Fixed deposits retrieved successfully', result.fixedDeposits, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const updateFixedDeposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const fixedDeposit = await fixedDepositService.updateFixedDeposit(Number(id), req.body);
    successResponse(res, 'Fixed deposit updated successfully', fixedDeposit);
  } catch (error) {
    next(error);
  }
};

export const deleteFixedDeposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fixedDepositService.deleteFixedDeposit(Number(id));
    successResponse(res, result.message);
  } catch (error) {
    next(error);
  }
};

export const getMatureDeposits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const matureDeposits = await fixedDepositService.getMatureDeposits();
    successResponse(res, 'Mature deposits retrieved successfully', matureDeposits);
  } catch (error) {
    next(error);
  }
};