// routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';


const router = Router();

router.get(
  '/update-transfer/:id',
  TransactionController.updateTransfer
);

export default router;
