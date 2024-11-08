import { Router } from 'express';

import multer from 'multer';
import BankController from '../controllers/BankController';

const bankRoutes = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary path, change as needed

bankRoutes.get('/', BankController.getAllBanks);
bankRoutes.post('/', upload.single('logo'), BankController.createBank); // Expect a logo file in the "logo" field
bankRoutes.patch('/:id', upload.single('logo'), BankController.updateBank);
bankRoutes.delete('/:id', BankController.deleteBank);

export default bankRoutes;
