import { Request, Response } from 'express';
import { AccountService } from '../service/AccountService';

export class AccountController {
  // Credit account without creating a transfer
  static async creditAccountWithoutTransfer(req: Request, res: Response) {
    const clientId = parseInt(req.params.clientId);
    const { amount } = req.body;

    try {
      await AccountService.creditAccountWithoutTransfer(clientId, amount);
      res.status(200).json({ message: 'Account credited successfully without transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Debit account without creating a transfer
  static async debitAccountWithoutTransfer(req: Request, res: Response) {
    const clientId = parseInt(req.params.clientId);
    const { amount } = req.body;

    try {
      await AccountService.debitAccountWithoutTransfer(clientId, amount);
      res.status(200).json({ message: 'Account debited successfully without transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Credit account and create a transfer
  static async creditAccountWithTransfer(req: Request, res: Response) {
    const clientId = parseInt(req.params.clientId);
    const { amount } = req.body;

    try {
      await AccountService.creditAccountWithTransfer(clientId, amount);
      res.status(200).json({ message: 'Account credited successfully with transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Debit account and create a transfer
  static async debitAccountWithTransfer(req: Request, res: Response) {
    const clientId = parseInt(req.params.clientId);
    const { amount } = req.body;

    try {
      await AccountService.debitAccountWithTransfer(clientId, amount);
      res.status(200).json({ message: 'Account debited successfully with transfer' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


static async editTransfer(req: Request, res: Response) {
    const clientId = parseInt(req.params.clientId);
    const { 
      totalTransferAmount,
      numberOfTransfers,
      termDepositStartDate,
      termDepositEndDate
     } = req.body;
  try{await AccountService.deleteAndCreateNewTransfers(
    clientId,
    numberOfTransfers,
    termDepositStartDate,
    termDepositEndDate,
    totalTransferAmount
  );

  res.status(200).json({ message: 'Transfers deleted and created successfully' });
} catch (error:any) {
  console.error('Error handling transfers:', error);
  res.status(500).json({ error: 'Failed to handle transfers' });
}
}

static async createAccount(req: Request, res: Response) {
  const clientId = parseInt(req.params.clientId );
  const { 
    checkingbalance,
    numberOfTransfers,
    transferStartDate,
    transferEndDate,
    termDepositStartDate,
    percentageIncrease,
    termDepositEndDate,
    totalTransferAmount,
    termDeposit
   } = req.body;
try{await AccountService.createAccountAndTransfers(
  {
    checkingbalance,
    numberOfTransfers,
    transferStartDate,
    transferEndDate,
    termDepositStartDate,
    percentageIncrease,
    termDepositEndDate,
    totalTransferAmount,
    termDeposit,
    clientId: ''
  }
);

res.status(201).json({ message: 'Accounts created successfully' });
} catch (error:any) {
console.error('Error handling transfers:', error);
res.status(500).json({ error: 'Failed to handle transfers' });
}
}
}
