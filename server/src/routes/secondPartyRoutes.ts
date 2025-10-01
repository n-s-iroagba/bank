import { Router } from 'express';
import { createSecondParty, getAllSecondParties, getSecondPartiesByBank, getSecondParty, updateSecondParty, deleteSecondParty, bulkCreateSecondPartiesFromForm, bulkCreateSecondPartiesFromExcel } from '../controllers/secondPartyController';
import { upload } from '../middleware/upload';
import { validate } from '../middleware/validation';
import { createSecondPartySchema, secondPartyQuerySchema, secondPartyIdSchema, updateSecondPartySchema, bulkCreateSecondPartiesSchema } from '../validations/secondPartyValidation';


const router = Router();

router.post('/', validate(createSecondPartySchema), createSecondParty);
router.get('/', validate(secondPartyQuerySchema), getAllSecondParties);
router.get('/bank/:bankId',  getSecondPartiesByBank);
router.get('/:id', validate(secondPartyIdSchema), getSecondParty);
router.put('/:id', validate(updateSecondPartySchema), updateSecondParty);
router.delete('/:id', validate(secondPartyIdSchema), deleteSecondParty);
router.post('/bulk-form', validate(bulkCreateSecondPartiesSchema), bulkCreateSecondPartiesFromForm);
router.post('/bulk-excel', upload.single('file'), bulkCreateSecondPartiesFromExcel);

export default router;