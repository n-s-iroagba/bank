import { Request, Response } from 'express';
import { AccountService } from '../service/CheckingAccountService';
import { UpdateCheckingAccount } from '../types/CheckingAccountTypes';



export class AccountController {
  // Credit account without creating a transfer
  static async editBalanceAccountWithoutTransaction(req: Request, res: Response) {
    const adminId= parseInt(req.params.id);
    const { amount } = req.body;

    try {
      await AccountService.editCheckingBalanceWithNoTransaction(adminId, amount);
      res.status(200).json({ message: 'Account credited successfully without transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async editBalanceAccountWithTransaction(req: Request, res: Response) {
    const adminId = parseInt(req.params.clientId);
    const { amount } = req.body;

    try {
      await AccountService.editCheckingBalanceWithNoTransaction(adminId, amount);
      res.status(200).json({ message: 'Account credited successfully with transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  static async updateCheckingAccount(req: Request, res: Response) {
    const { id } = req.params;
    const { balance, accountNumber }: UpdateCheckingAccount = req.body ;

    try {
      const updatedAccount = await AccountService.updateCheckingAccount(parseInt(id), {
        balance,
        accountNumber,
      });

      if (updatedAccount) {
        res.status(200).json({ message: 'Checking account updated successfully', updatedAccount });
      } else {
        res.status(404).json({ message: 'Checking account not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
