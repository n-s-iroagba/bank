
import { Request, Response } from 'express';
import { TermDepositAccountService } from '../service/TermDepositAccountService';
import { UpdateTermDepositAccount } from '../types/TermDepositAccountTypes';
import { TermDepositAccount } from '../models/TermDepositAccount';

export class TermDepositAccountController {

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const accountData: UpdateTermDepositAccount = req.body;
      const updatedAccount = await TermDepositAccountService.updateTermDepositAccount(id, accountData);
      res.status(200).json(updatedAccount);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const message = await TermDepositAccountService.deleteTermDepositAccount(id);
      res.status(200).json(message);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


  static async get(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const account = await TermDepositAccount.findByPk(id)
      res.status(200).json(account);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
