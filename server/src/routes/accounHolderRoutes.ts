import { Router } from 'express';
import { AccountHolderController } from '../controllers/AccountHolderController';

const accountHolderRoutes = Router();
accountHolderRoutes.post('/create/:id',AccountHolderController.createAccountHolder)


accountHolderRoutes.get('/get/:id', AccountHolderController.getByAdminId);
accountHolderRoutes.get('/details/:id', AccountHolderController.getDetails);

accountHolderRoutes.patch('/update/:id', AccountHolderController.update);


accountHolderRoutes.delete('/delete/:id', AccountHolderController.delete);

accountHolderRoutes.post('/login', AccountHolderController.loginAccountHolder);


export default accountHolderRoutes;
