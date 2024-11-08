// routes/TermDepositAccountRoutes.ts
import { Router } from 'express';
import { TermDepositAccountController } from '../controllers/TermDepositAccountController';

const termDepositRoutes = Router();

termDepositRoutes.put('/:id', TermDepositAccountController.update);  // Update a Term Deposit Account
termDepositRoutes.delete('/:id', TermDepositAccountController.delete);  // Delete a Term Deposit Account

export default termDepositRoutes;
