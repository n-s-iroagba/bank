// routes/transactionRoutes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';


const router = Router();

router.get('/update/:id', TransactionController.updateTransfer);
router.post('/')

export default router;
