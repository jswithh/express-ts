import { Router } from 'express';
import { PagesController } from './pages.controller';
import { checkAuth } from '../auth/middleware/checkAuth';
import { checkRole } from '../auth/middleware/checkRole';

const router = Router();

const pageController = new PagesController();
router
  .get('/', pageController.getAll)
  .get('/:url', pageController.show)
  .post(
    '/create',
    [checkAuth, checkRole(['admin', 'user'])],
    pageController.create,
  )
  .patch(
    '/update/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    pageController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    pageController.delete,
  );
export default router;
