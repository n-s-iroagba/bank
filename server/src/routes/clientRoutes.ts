// /src/routes/clientRoutes.ts
import { Router } from 'express';
import {
  createClient,
  getClientsByAdminId,
  getClientById,
  updateClient,
  deleteClient,
  loginClient,
} from '../controllers/clientController';

const router: Router = Router();

router.post('/', createClient); // Create a new client
router.get('/:adminId', getClientsByAdminId); // Get all clients by adminId
router.get('/:id', getClientById); // Get a single client
router.put('/:id', updateClient); // Update a client
router.delete('/:id', deleteClient); // Delete a client
router.post('/login', loginClient); // Client login

export default router;
