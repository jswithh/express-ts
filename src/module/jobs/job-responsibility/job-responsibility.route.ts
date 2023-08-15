import { Router } from 'express';
import { JobsResponsibilityController } from './job-responsibility.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';

const router = Router();

const jobsResponsibilityController = new JobsResponsibilityController();
router
  .get(
    '/:jobId',
    [checkAuth, checkRole(['admin', 'user'])],
    jobsResponsibilityController.getAll,
  )
  .post(
    '/create/:jobId',
    [checkAuth, checkRole(['admin', 'user'])],
    jobsResponsibilityController.create,
  )
  .patch(
    '/update/:jobId',
    [checkAuth, checkRole(['admin', 'user'])],
    jobsResponsibilityController.update,
  )
  .delete(
    '/delete/:id',
    [checkAuth, checkRole(['admin', 'user'])],
    jobsResponsibilityController.delete,
  );
export default router;
