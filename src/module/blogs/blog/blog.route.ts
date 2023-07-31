import { Router } from 'express';
import { BlogsController } from './blog.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const blogController = new BlogsController();
router
  .get('/', blogController.getAll)
  .get(
    '/draft',
    [checkAuth, checkRole(['admin', 'user'])],
    blogController.blogsDraft,
  )
  .post(
    '/create',
    [checkAuth, checkRole(['admin', 'user'])],

    blogController.create,
  )
  .get('/:slug', blogController.show)
  .patch(
    '/update/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    blogController.update,
  )
  .delete(
    '/delete/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    blogController.delete,
  );
export default router;
