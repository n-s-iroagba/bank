import { Router } from 'express';

import multer from 'multer';
import BankController from '../controllers/BankController';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary path, change as needed

router.get('/', BankController.getAllBanks);
router.post('/', upload.single('logo'), BankController.createBank); // Expect a logo file in the "logo" field
router.put('/:id', upload.single('logo'), BankController.updateBank);
router.delete('/:id', BankController.deleteBank);

export default router;
