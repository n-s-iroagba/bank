import { Router } from 'express';
import { createFixedDeposit, getAllFixedDeposits, getFixedDepositsByAccountHolder, getFixedDeposit, updateFixedDeposit, deleteFixedDeposit, getMatureDeposits } from '../controllers/fixedDepositController';
import { validate } from '../middleware/validation';
import { createFixedDepositSchema, fixedDepositQuerySchema, updateFixedDepositSchema } from '../validations/fixedDepositValidation';


const router = Router();

router.post('/', validate(createFixedDepositSchema), createFixedDeposit);
router.get('/', validate(fixedDepositQuerySchema), getAllFixedDeposits);
router.get('/account-holder/:accountHolderId', getFixedDepositsByAccountHolder);
router.get('/:id', getFixedDeposit);
router.put('/:id', validate(updateFixedDepositSchema), updateFixedDeposit);
router.delete('/:id', deleteFixedDeposit);
router.get('/mature/deposits', getMatureDeposits);

export default router;