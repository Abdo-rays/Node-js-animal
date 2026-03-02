import { Router } from 'express';
import * as shopController from './shop.controller.js';
import { auth } from '../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.js';
import * as validators from './shop.validation.js';

const router = Router();

router.get('/', shopController.getAllProducts);
router.get('/:id', shopController.getProductById);

router.post('/', auth, validation(validators.createProductSchema), shopController.addProduct);
router.patch('/:id', auth, validation(validators.updateProductSchema), shopController.updateProduct);
router.delete('/:id', auth, shopController.deleteProduct);

export default router;