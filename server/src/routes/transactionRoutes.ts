// routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';


const transactionRoutes = Router();

transactionRoutes.patch('/update/:id', TransactionController.updateTransfer);
transactionRoutes.get('/delete/:id', TransactionController.delete);
transactionRoutes.get('/get/:id',TransactionController.get)

export default transactionRoutes;
