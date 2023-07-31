import { Router } from 'express';
import { LearningMaterialController } from './learning-material.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const learningMaterialController = new LearningMaterialController();
router
  .get(
    '/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    learningMaterialController.getAll,
  )
  .post(
    '/create/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    learningMaterialController.create,
  )
  .patch(
    '/update/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    learningMaterialController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    learningMaterialController.delete,
  );
export default router;
