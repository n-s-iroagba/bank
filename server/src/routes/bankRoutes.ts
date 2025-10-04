import { Router } from 'express';

import { upload } from '../middleware/upload';
import { validate } from '../middleware/validation';
import { createBankSchema, bulkCreateBanksSchema } from '../validations/bankValidation';
import { BankController } from '../controllers/BankController';

const bankController = new BankController()
const router = Router();

router.post('/', validate(createBankSchema), bankController.createBank);
router.get('/',  bankController.getAllBanks);
router.get('/:id',  bankController.getBankById);
router.put('/:id',  bankController.updateBank);
router.delete('/:id', bankController.deleteBank);
router.post('/bulk-form', validate(bulkCreateBanksSchema), bankController.bulkCreateBanksFromForm);
router.post('/bulk-excel', upload.single('file'), bankController.bulkCreateBanksFromExcel);

export default router;