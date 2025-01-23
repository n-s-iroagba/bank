import { Router } from 'express';
import BankController from '../controllers/BankController';
import { upload } from '../config/multer';

const bankRouter = Router();

bankRouter.get('/', BankController.getAllBanks);

bankRouter.post("/create/:id",  upload.array('logos'), BankController.createBanks); // Expect a logo file in the "logo" field
bankRouter.patch('/update/:id', upload.single('logo'), BankController.updateBank);
bankRouter.delete('/delete/:id', BankController.deleteBank);

export default bankRouter
