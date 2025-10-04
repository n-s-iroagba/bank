import { Router } from 'express';
import { createAccountHolder, getAllAccountHolders, getAccountHolder, updateAccountHolder, deleteAccountHolder } from '../controllers/accountHolderController';
import { validate } from '../middleware/validation';
import { createAccountHolderSchema, accountHolderQuerySchema, updateAccountHolderSchema } from '../validations/accountHolderValidation';


const router = Router();

router.post('/', createAccountHolder);
router.get('/', validate(accountHolderQuerySchema), getAllAccountHolders);
router.get('/:id', getAccountHolder);
router.put('/:id', validate(updateAccountHolderSchema), updateAccountHolder);
router.delete('/:id', deleteAccountHolder);

export default router;