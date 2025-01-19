import express from 'express';
import { CheckingAccountController } from '../controllers/CheckingAccountController';


const checkingAccountRoutes = express.Router();

checkingAccountRoutes.patch('/no-transaction/:id', CheckingAccountController.editBalanceAccountWithoutTransaction);

checkingAccountRoutes.patch('/with-transaction/:id', CheckingAccountController.editBalanceAccountWithTransaction);

checkingAccountRoutes.get('/get/:id', CheckingAccountController.getCheckingAccount);

checkingAccountRoutes.patch('/debit/:id', CheckingAccountController.debitAccount);
checkingAccountRoutes.post('/update/:id', CheckingAccountController.updateCheckingAccount)

export default checkingAccountRoutes;
