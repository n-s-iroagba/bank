// routes/SecondPartyRoutes.ts
import { Router } from 'express';
import { SecondPartyController } from '../controllers/SecondPartyController';


const secondPartyRoutes = Router();

// Create a new SecondParty
secondPartyRoutes.post('/second-parties', SecondPartyController.createSecondParty);

// Get all SecondParties
secondPartyRoutes.get('/second-parties', SecondPartyController.getAllSecondParties);

// Update a SecondParty by ID
secondPartyRoutes.put('/second-parties/:id', SecondPartyController.updateSecondParty);

// Delete a SecondParty by ID
secondPartyRoutes.delete('/second-parties/:id', SecondPartyController.deleteSecondParty);

export default secondPartyRoutes;
