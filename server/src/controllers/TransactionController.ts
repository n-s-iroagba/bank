
// controllers/TransferController.ts
import { Request, Response } from 'express';

import { TransactionService } from '../service/TransactionService';
import { CreateTransactionSystem } from '../types/TransactionType';
import { Transaction } from '../models/Transaction';

export class TransactionController {
  static async updateTransfer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        numberOfTransfers,
        transferStartDate,
        transferEndDate,
        highestTransfer,
        lowestTransfer,
      }: CreateTransactionSystem = req.body;

      if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return;
      }

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
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
         throw new Error('Id is required');
        
      }

      const transactions = await Transaction.findAll({ where: { accountId: id } });
      res.status(200).json(transactions);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('Id is required');
      }

      const transactions = await Transaction.findByPk(id);
      if (transactions) {
        await transactions.destroy();
        res.status(200).json({ message: 'Transaction deleted successfully' });
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}
