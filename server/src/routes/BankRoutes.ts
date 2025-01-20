import { Router } from 'express';
import BankController from '../controllers/BankController';
import { upload } from '../config/multer';

const bankRoutes = Router();

bankRoutes.get('/', BankController.getAllBanks);
bankRoutes.post('/', upload.single('logo'), BankController.createBank);
bankRoutes.post("/bulk-upload", upload.single("file"), BankController.handleBulkUpload); // Expect a logo file in the "logo" field
bankRoutes.patch('/:id', upload.single('logo'), BankController.updateBank);
bankRoutes.delete('/:id', BankController.deleteBank);

export default bankRoutes;
