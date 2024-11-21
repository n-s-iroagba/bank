// routes/SecondPartyRoutes.ts
import { Router } from 'express';
import { SecondPartyController } from '../controllers/SecondPartyController';


const secondPartyRoutes = Router();

// Create a new SecondParty
secondPartyRoutes.post('/:adminId', SecondPartyController.createSecondParty);

// Get all SecondParties
secondPartyRoutes.get('/:adminId', SecondPartyController.getAllSecondParties);

// Update a SecondParty by ID
secondPartyRoutes.put('/:id', SecondPartyController.updateSecondParty);

// Delete a SecondParty by ID
secondPartyRoutes.delete('/:id', SecondPartyController.deleteSecondParty);

export default secondPartyRoutes;
