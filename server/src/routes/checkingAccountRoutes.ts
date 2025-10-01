import { Router } from 'express';
import {
  createCheckingAccount,
  getCheckingAccount,
  getCheckingAccountsByAccountHolder,
  getAllCheckingAccounts,
  updateCheckingAccount,
  deleteCheckingAccount,
} from '../controllers/checkingAccountController';
import {
  createCheckingAccountSchema,
  updateCheckingAccountSchema,
  checkingAccountIdSchema,
  checkingAccountQuerySchema,
  accountHolderIdParamSchema,
} from '../validations/checkingAccountValidation';
import { validate } from '../middleware/validation';

const router = Router();

router.post('/', validate(createCheckingAccountSchema), createCheckingAccount);
router.get('/', validate(checkingAccountQuerySchema), getAllCheckingAccounts);
router.get('/account-holder/:accountHolderId', validate(accountHolderIdParamSchema), getCheckingAccountsByAccountHolder);
router.get('/:id', validate(checkingAccountIdSchema), getCheckingAccount);
router.put('/:id', validate(updateCheckingAccountSchema), updateCheckingAccount);
router.delete('/:id', validate(checkingAccountIdSchema), deleteCheckingAccount);

export default router;