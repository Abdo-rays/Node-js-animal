import { Router } from 'express';
import * as reportController from './report.controller.js';
import { auth } from '../../middleware/auth.middleware.js';
import validation from '../../middleware/validation.js';
import * as validators from './report.validation.js';

const router = Router();

router.post('/', auth, validation(validators.createReportSchema), reportController.createReport);

router.get('/', auth, reportController.getAllReports);

router.delete('/:id', auth, validation(validators.reportIdSchema), reportController.deleteReportAndTarget);

export default router;