import { Router } from 'express';
import { BusinessLineController } from './business-line.controller';
import { checkAuth } from '../auth/middleware/checkAuth';
import { checkRole } from '../auth/middleware/checkRole';
const router = Router();
const businessLineController = new BusinessLineController();
router
    .get('/', businessLineController.getAll)
    .get('/:slug', businessLineController.show)
    .post('/create', [checkAuth, checkRole(['admin', 'user'])], businessLineController.create)
    .patch('/update/:slug', [checkAuth, checkRole(['admin', 'user'])], businessLineController.update)
    .delete('/delete/:slug', [checkAuth, checkRole(['admin', 'user'])], businessLineController.delete);
export default router;
//# sourceMappingURL=business-line.route.js.map