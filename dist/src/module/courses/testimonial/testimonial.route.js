import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';
import { checkAuth } from '../../auth/middleware/checkAuth';
import { checkRole } from '../../auth/middleware/checkRole';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();
const testimonialController = new TestimonialController();
router
    .get('/:courseId', [checkAuth, checkRole(['admin', 'user'])], testimonialController.getAll)
    .post('/create/:courseId', [checkAuth, checkRole(['admin', 'user'])], upload.single('profileImg'), testimonialController.create)
    .patch('/update/:id', [checkAuth, checkRole(['admin', 'user'])], upload.single('profileImg'), testimonialController.update)
    .delete('/delete/:id', [checkAuth, checkRole(['admin', 'user'])], testimonialController.delete);
export default router;
//# sourceMappingURL=testimonial.route.js.map