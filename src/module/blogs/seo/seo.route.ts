import { Router } from 'express';
import { SeoController } from './seo.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const seoController = new SeoController();
router
  .get(
    '/:blogId',
    [checkAuth, checkRole(['admin', 'user'])],
    seoController.getAll,
  )
  .post(
    '/create/:blogId',
    [checkAuth, checkRole(['admin', 'user'])],
    seoController.create,
  )
  .patch(
    '/update/:blogId',
    [checkAuth, checkRole(['admin', 'user'])],
    seoController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    seoController.delete,
  );
export default router;
