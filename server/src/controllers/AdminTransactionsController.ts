// controllers/adminController.ts
import { Request, Response } from 'express';
import * as service from '../services/AdminTransactionService';

export const visibleCreditController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { amount } = req.body;
  try {
    const result = await service.updateVisibleCredit(clientId, amount);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const invisibleCreditController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { amount } = req.body;
  try {
    const result = await service.updateInvisibleCredit(clientId, amount);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const visibleDebitController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { amount } = req.body;
  try {
    const result = await service.updateVisibleDebit(clientId, amount);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const invisibleDebitController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { amount } = req.body;
  try {
    const result = await service.updateInvisibleDebit(clientId, amount);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTermDepositController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { termDepositDetails } = req.body;
  try {
    const result = await service.updateTermDeposit(clientId, termDepositDetails);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
