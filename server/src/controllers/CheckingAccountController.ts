import { Request, Response } from 'express';
import { CheckingAccountService } from '../service/CheckingAccountService';
import { UpdateCheckingAccount } from '../types/CheckingAccountTypes';



export class CheckingAccountController {
  static async editBalanceAccountWithoutTransaction(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);
    const { amount } = req.body;

    try {
      await CheckingAccountService.editCheckingBalanceWithNoTransaction(accountId, amount);
      res.status(200).json({ message: 'Account credited successfully without transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async editBalanceAccountWithTransaction(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);
    const { amount, date, description, secondPartyId, transactionType } = req.body;

    try {
      await CheckingAccountService.editCheckingBalanceWithTransaction(accountId, {
        amount,
        date,
        description,
        secondPartyId,
        transactionType,
      });
      res.status(200).json({ message: 'Account updated successfully with transaction' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCheckingAccount(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);

    try {
      const account = await CheckingAccountService.getCheckingAccount(accountId);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Checking account not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCheckingAccount(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);
    const { balance, accountNumber }: UpdateCheckingAccount = req.body;

    try {
      const updatedAccount = await CheckingAccountService.updateCheckingAccount(accountId, {
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

  static async debitAccount(req: Request, res: Response) {
    const accountId = parseInt(req.params.id);
    const { amount } = req.body;

    try {
      await CheckingAccountService.debitAccount(accountId, amount);
      res.status(200).json({ message: 'Account debited successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
