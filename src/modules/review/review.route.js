import { Router } from 'express';
import * as reviewController from './review.controller.js';
import { auth } from '../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.js';
import * as validators from './review.validation.js';

const router = Router();

router.get('/:targetId', reviewController.getReviews);


router.post('/',
    auth,
    validation(validators.createReviewSchema),
    reviewController.addReview
);

export default router;