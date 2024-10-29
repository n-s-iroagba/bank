// /src/routes/clientRoutes.ts
import { Router } from 'express';
import { createClient, deleteClient, getClientById, getClientsByAdminId, loginClient, updateClient } from '../controllers/ClientController';


const router: Router = Router();

router.post('/', createClient); 
router.get('/:adminId', getClientsByAdminId); 
router.get('/:id', getClientById); 
router.put('/:id', updateClient); 
router.delete('/:id', deleteClient); 
router.post('/login', loginClient); 

export default router;
