import { Router } from 'express';
import * as orderController from './order.controller.js';
import { auth } from '../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.js';
import * as validators from './order.validation.js';

const router = Router();

router.post('/', auth, validation(validators.createOrderSchema), orderController.createOrder);
router.get('/', auth, orderController.getMyOrders);
router.get('/:id', auth, validation(validators.orderIdSchema), orderController.getOrderById);
router.patch('/:id', auth, validation(validators.orderIdSchema), orderController.updateOrder);
router.delete('/:id', auth, validation(validators.orderIdSchema), orderController.cancelOrder);

export default router;