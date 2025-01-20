
import { Router } from 'express';
import { SecondPartyController } from '../controllers/SecondPartyController';
import { upload } from '../config/multer';
const secondPartyRouter = Router();
secondPartyRouter.post('/create/:id', SecondPartyController.createSecondParty);
secondPartyRouter.post("/bulk-create/:id", upload.single("file"), SecondPartyController.uploadBulkSecondParties);
secondPartyRouter.get('/', SecondPartyController.getAllSecondParties);
secondPartyRouter.put('/update/:id', SecondPartyController.updateSecondParty);
secondPartyRouter.delete('/delete/:id', SecondPartyController.deleteSecondParty);

export default secondPartyRouter;
