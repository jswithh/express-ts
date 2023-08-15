import { Router } from 'express';
import { JobsQualificationController } from './job-qualification.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
const router = Router();
const jobsQualificationController = new JobsQualificationController();
router
    .get('/:jobId', [checkAuth, checkRole(['admin', 'user'])], jobsQualificationController.getAll)
    .post('/create/:jobId', [checkAuth, checkRole(['admin', 'user'])], jobsQualificationController.create)
    .patch('/update/:jobId', [checkAuth, checkRole(['admin', 'user'])], jobsQualificationController.update)
    .delete('/delete/:id', [checkAuth, checkRole(['admin', 'user'])], jobsQualificationController.delete);
export default router;
//# sourceMappingURL=job-qualification.route.js.map