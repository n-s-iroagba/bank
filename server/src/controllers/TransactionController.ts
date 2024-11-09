// controllers/TransferController.ts
import { Request, Response } from 'express';

import { TransactionService } from '../service/TransactionService';
import { CreateTransactionSystem } from '../types/TransactionType';

export class TransactionController {
  static async updateTransfer(req: Request, res: Response) {
    const { id } = req.params;
    const {
      numberOfTransfers,
      transferStartDate,
      transferEndDate,
      highestTransfer,
      lowestTransfer,
    }:CreateTransactionSystem = req.body ;

    try {
      const updatedTransfer = await TransactionService.updateTransaction(parseInt(id), {
        numberOfTransfers,
        transferStartDate,
        transferEndDate,
        highestTransfer,
        lowestTransfer,
      });

      if (updatedTransfer) {
        res.status(200).json({ message: 'Transfer updated successfully', updatedTransfer });
      } else {
        res.status(404).json({ message: 'Transfer not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
