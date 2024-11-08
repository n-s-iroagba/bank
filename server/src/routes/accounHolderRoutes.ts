import { Router } from 'express';
import { AccountHolderController } from '../controllers/AccountHolderController';

const accountHolderRoutes = Router();

// Route to get all AccountHolders
accountHolderRoutes.get('/accountHolders', AccountHolderController.getAll);

// Route to get AccountHolders by adminId
accountHolderRoutes.get('/accountHolders/admin/:adminId', AccountHolderController.getByAdminId);

// Route to update an AccountHolder
accountHolderRoutes.put('/accountHolders/update', AccountHolderController.update);

// Route to delete an AccountHolder by id
accountHolderRoutes.delete('/accountHolders/:id', AccountHolderController.delete);

accountHolderRoutes.post('/accountHolders/login', AccountHolderController.loginAccountHolder);


export default accountHolderRoutes;
