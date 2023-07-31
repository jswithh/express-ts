import { Router } from 'express';
import { FeatureController } from './feature.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const featureController = new FeatureController();
router
  .get(
    '/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    featureController.getAll,
  )
  .post(
    '/create/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    featureController.create,
  )
  .patch(
    '/update/:courseId',
    [checkAuth, checkRole(['admin', 'user'])],
    featureController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    featureController.delete,
  );
export default router;
