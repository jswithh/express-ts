import { Router } from 'express';
import { reportRealtime, report } from './analytic.controller';
import { checkAuth } from '../auth/middleware/checkAuth';
import { checkRole } from '../auth/middleware/checkRole';

const router = Router();

router.get('/', [checkAuth, checkRole(['admin', 'user'])], report);
router.get(
  '/realtime',
  [checkAuth, checkRole(['admin', 'user'])],
  reportRealtime,
);

export default router;
