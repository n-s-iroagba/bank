import { Router } from 'express';


import { validate } from '../middleware/validation';
import { createTransactionSchema, transactionQuerySchema, checkingAccountIdParamSchema, transactionIdSchema, updateTransactionSchema, accountStatementSchema } from '../validations/transactionValidation';
import { getAllTransactions, getTransactionsByCheckingAccount, getTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { createTransaction, getAccountStatement } from '../controllers/transactionController';


const router = Router();

router.post('/', validate(createTransactionSchema), createTransaction);
router.get('/', validate(transactionQuerySchema), getAllTransactions);
router.get('/checking-account/:checkingAccountId', validate(checkingAccountIdParamSchema), getTransactionsByCheckingAccount);
router.get('/:id', validate(transactionIdSchema), getTransaction);
router.put('/:id', validate(updateTransactionSchema), updateTransaction);
router.delete('/:id', validate(transactionIdSchema), deleteTransaction);
router.get('/statement/:checkingAccountId', validate(accountStatementSchema), getAccountStatement);

export default router;