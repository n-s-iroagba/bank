// controllers/TermDepositAccountController.ts
import { Request, Response } from 'express';
import { TermDepositAccountService } from '../service/TermDepositAccountService';
import { EditTermDepositAccount } from '../types/TermDepositAccount';



export class TermDepositAccountController {


  // Update a Term Deposit Account
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const accountData: EditTermDepositAccount = req.body;
      const updatedAccount = await TermDepositAccountService.updateTermDepositAccount(id, accountData);
      res.status(200).json(updatedAccount);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a Term Deposit Account
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const message = await TermDepositAccountService.deleteTermDepositAccount(id);
      res.status(200).json(message);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
