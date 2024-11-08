import express from 'express';
import { AccountController } from '../controllers/CheckingAccountController';


const checkingAccountRoutes = express.Router();

// Credit and debit without transfer
checkingAccountRoutes.patch('/balance-no-transfer/:accountId', AccountController.editBalanceAccountWithoutTransaction);

checkingAccountRoutes.patch('/balance-transfer/:accountId', AccountController.editBalanceAccountWithTransaction);

checkingAccountRoutes.post('/debit/:id', AccountController.updateCheckingAccount)




export default checkingAccountRoutes;
