import { Router } from 'express';
import { UsersController } from './users.controller';
import { checkAuth } from '../auth/middleware/checkAuth';
import { checkRole } from '../auth/middleware/checkRole';
const router = Router();
const userController = new UsersController();
router
    .get('/', [checkAuth, checkRole(['admin'])], userController.getAll)
    .post('/create', [checkAuth, checkRole(['admin'])], userController.create)
    .get('/:id', [checkAuth, checkRole(['admin'])], userController.show)
    .patch('/update/:id', [checkAuth, checkRole(['admin'])], userController.update)
    .delete('/delete/:id', [checkAuth, checkRole(['admin'])], userController.delete);
export default router;
//# sourceMappingURL=users.route.js.map