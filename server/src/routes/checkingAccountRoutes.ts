import express from 'express';
import { AccountController } from '../controllers/CheckingAccountController';


const checkingAccountRoutes = express.Router();

// Credit and debit without transfer
checkingAccountRoutes.patch('/no-transaction/:adminId', AccountController.editBalanceAccountWithoutTransaction);

checkingAccountRoutes.patch('/with-transaction/:adminId', AccountController.editBalanceAccountWithTransaction);

checkingAccountRoutes.post('/update/:id', AccountController.updateCheckingAccount)

export default checkingAccountRoutes;
