import { Router } from 'express';
import { JobDocumentController } from './job-document.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();
const jobDocumentController = new JobDocumentController();
router
    .get('/', jobDocumentController.getAll)
    .post('/create/:jobId', upload.single('document'), jobDocumentController.create)
    .delete('/delete/:jobId', [checkAuth, checkRole(['admin', 'user'])], jobDocumentController.delete);
export default router;
//# sourceMappingURL=job-document.route.js.map