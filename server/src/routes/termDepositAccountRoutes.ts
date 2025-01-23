// routes/TermDepositAccountRoutes.ts
import { Router } from 'express';
import { TermDepositAccountController } from '../controllers/TermDepositAccountController';

const termDepositRoutes = Router();
termDepositRoutes.get('/get/:id', TermDepositAccountController.get); 
termDepositRoutes.put('/:id', TermDepositAccountController.update);  // Update a Term Deposit Account
termDepositRoutes.delete('/:id', TermDepositAccountController.delete);  // Delete a Term Deposit Account

export default termDepositRoutes;
