import { Request, Response, NextFunction } from 'express';
import { secondPartyService } from '../services';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { AppError } from '../utils/errors';

export const createSecondParty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secondParty = await secondPartyService.createSecondParty(req.body);
    successResponse(res, 'Second party created successfully', secondParty, 201);
  } catch (error) {
    next(error);
  }
};

export const getSecondParty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const secondParty = await secondPartyService.getSecondPartyById(Number(id));
    successResponse(res, 'Second party retrieved successfully', secondParty);
  } catch (error) {
    next(error);
  }
};

export const getSecondPartiesByBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bankId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await secondPartyService.getSecondPartiesByBankId(Number(bankId), page, limit);
    successResponse(res, 'Second parties retrieved successfully', result.secondParties,  result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getAllSecondParties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await secondPartyService.getAllSecondParties(page, limit);
    successResponse(res, 'Second parties retrieved successfully', result.secondParties,  result.pagination);
  } catch (error) {
    next(error);
  }
};

export const updateSecondParty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const secondParty = await secondPartyService.updateSecondParty(Number(id), req.body);
    successResponse(res, 'Second party updated successfully', secondParty);
  } catch (error) {
    next(error);
  }
};

export const deleteSecondParty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await secondPartyService.deleteSecondParty(Number(id));
    successResponse(res, result.message);
  } catch (error) {
    next(error);
  }
};

export const bulkCreateSecondPartiesFromForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secondParties = await secondPartyService.bulkCreateSecondPartiesFromForm(req.body.secondParties);
    successResponse(res, 'Second parties created successfully', secondParties, 201);
  } catch (error) {
    next(error);
  }
};

export const bulkCreateSecondPartiesFromExcel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError('Excel file is required', 400);
    }
    
    const secondParties = await secondPartyService.bulkCreateSecondPartiesFromExcel(req.file.buffer);
    successResponse(res, 'Second parties created successfully from Excel', secondParties, 201);
  } catch (error) {
    next(error);
  }
};