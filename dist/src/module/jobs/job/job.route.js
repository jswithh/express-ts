import { Router } from 'express';
import { JobController } from './job.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();
const jobController = new JobController();
router
    .get('/', jobController.getAll)
    .get('/:slug', jobController.show)
    .post('/create', [checkAuth, checkRole(['admin', 'user'])], upload.single('images'), jobController.create)
    .patch('/update/:slug', [checkAuth, checkRole(['admin', 'user'])], upload.single('images'), jobController.update)
    .patch('/delete/:slug', [checkAuth, checkRole(['admin', 'user'])], jobController.delete);
export default router;
//# sourceMappingURL=job.route.js.map