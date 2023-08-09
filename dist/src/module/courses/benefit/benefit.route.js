import { Router } from 'express';
import { BenefitController } from './benefit.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
const router = Router();
const benefitController = new BenefitController();
router
    .get('/:courseId', [checkAuth, checkRole(['admin', 'user'])], benefitController.getAll)
    .post('/create/:courseId', [checkAuth, checkRole(['admin', 'user'])], benefitController.create)
    .patch('/update/:courseId', [checkAuth, checkRole(['admin', 'user'])], benefitController.update)
    .delete('/delete/:id', [checkAuth, checkRole(['admin', 'user'])], benefitController.delete);
export default router;
//# sourceMappingURL=benefit.route.js.map