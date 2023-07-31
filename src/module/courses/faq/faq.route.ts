import { Router } from 'express';
import { FaqController } from './faq.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const faqController = new FaqController();
router
  .get(
    '/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    faqController.getAll,
  )
  .post(
    '/create/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    faqController.create,
  )
  .patch(
    '/update/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    faqController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    faqController.delete,
  );
export default router;
