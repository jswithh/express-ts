import { BenefitService } from './benefit.service';
export class BenefitController {
    benefitService;
    constructor(benefitService = new BenefitService()) {
        this.benefitService = benefitService;
    }
    getAll = async (req, res) => {
        try {
            const courseId = Number(req.params.courseId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const courses = await this.benefitService.getAll(courseId, page, limit);
            return res.json(courses);
        }
        catch (error) {
            console.error('Error in CoursesController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createBenefitDto = req.body;
        const createdData = [];
        createBenefitDto.forEach((item) => {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
        });
        try {
            if (createdData.length > 0) {
                const result = await this.benefitService.create(createdData);
                return res.status(201).json({ message: result });
            }
        }
        catch (error) {
            console.error('Error in BenefitController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatebenefitDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatebenefitDto.forEach((item) => {
            if (item && item.hasOwnProperty('id')) {
                updatedData.push(item);
                updatedData[updatedData.length - 1].courseId = courseId;
            }
            else {
                createdData.push(item);
                createdData[createdData.length - 1].courseId = courseId;
            }
        });
        try {
            if (createdData.length > 0) {
                await this.benefitService.create(createdData);
            }
            if (updatedData.length > 0) {
                await this.benefitService.update(updatedData);
            }
            return res.json({ message: 'Benefit updated successfully' });
        }
        catch (error) {
            console.error('Error in BenefitController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const benefitId = Number(req.params.id);
        try {
            await this.benefitService.delete(benefitId);
            return res.json({ message: 'Benefit deleted successfully' });
        }
        catch (error) {
            console.error('Error in BenefitController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=benefit.controller.js.map