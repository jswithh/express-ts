import { Router } from 'express';
import { CoursesController } from './course.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
import uploadMiddleware from '../../../middleware/multer';

const router = Router();

const courseController = new CoursesController();
router
  .get('/', courseController.getAll)
  .get(
    '/draft',
    [checkAuth, checkRole(['admin', 'user'])],
    courseController.coursesDraft,
  )
  .post(
    '/create',
    [checkAuth, checkRole(['admin', 'user'])],
    uploadMiddleware('course').fields([
      { name: 'heroImg', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    courseController.create,
  )
  .get('/:slug', courseController.show)
  .patch(
    '/update/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    uploadMiddleware('course').fields([
      { name: 'heroImg', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    courseController.update,
  )
  .patch(
    '/delete/:slug',
    [checkAuth, checkRole(['admin', 'user'])],
    courseController.delete,
  );
export default router;
