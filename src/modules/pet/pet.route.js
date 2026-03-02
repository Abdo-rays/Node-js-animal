import { Router } from 'express';
import * as petServices from './pet.controller.js';
import validation from '../../middleware/validation.js';
import * as validators from './pet.validation.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', petServices.getAllPets);

router.post('/',
    auth,
    validation(validators.createPetSchema),
    petServices.addPet
);

router.patch('/:id',
    auth,
    validation(validators.updatePetSchema),
    petServices.updatePet
);

router.delete('/:id',
    auth,
    petServices.deletePet
);

export default router;