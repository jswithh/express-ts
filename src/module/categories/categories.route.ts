import { Router } from 'express';
import { CategoriesController } from './categories.controller';
import { checkAuth } from '../auth/middleware/checkAuth';
import { checkRole } from '../auth/middleware/checkRole';

const router = Router();

const categoryController = new CategoriesController();
router
  .get('/', categoryController.getAll)
  .post(
    '/create',
    [checkAuth, checkRole(['admin', 'user'])],
    categoryController.create,
  )
  .get('/:slug', categoryController.show)
  .patch(
    '/update/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    categoryController.update,
  )
  .patch(
    '/delete/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    categoryController.delete,
  );
export default router;
