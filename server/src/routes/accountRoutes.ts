import express from 'express';
import { AccountController } from '../controllers/AccountController';


const router = express.Router();

// Credit and debit without transfer
router.post('/credit-no-transfer/:accountId', AccountController.creditAccountWithoutTransfer);
router.post('/debit-no-transfer/:accountId', AccountController.debitAccountWithoutTransfer);

// Credit and debit with transfer
router.post('/credit/:accountId', AccountController.creditAccountWithTransfer);
router.post('/debit/:accountId', AccountController.debitAccountWithTransfer);
router.post('/update-transfer/:accountId', AccountController.editTransfer)

router.post('/create/account', AccountController.createAccount);


export default router;
