import { FeatureService } from './feature.service';
export class FeatureController {
    featureService;
    constructor(featureService = new FeatureService()) {
        this.featureService = featureService;
    }
    getAll = async (req, res) => {
        try {
            const courseId = Number(req.params.courseId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const courses = await this.featureService.getAll(courseId, page, limit);
            return res.json(courses);
        }
        catch (error) {
            console.error('Error in CoursesController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createFeatureDto = req.body;
        const createdData = [];
        createFeatureDto.forEach((item) => {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
        });
        try {
            if (createdData.length > 0) {
                const result = await this.featureService.create(createdData);
                return res.status(201).json({ message: result });
            }
        }
        catch (error) {
            console.error('Error in FeatureController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatefeatureDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatefeatureDto.forEach((item) => {
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
                await this.featureService.create(createdData);
            }
            if (updatedData.length > 0) {
                await this.featureService.update(updatedData);
            }
            return res.json({ message: 'Feature updated successfully' });
        }
        catch (error) {
            console.error('Error in FeatureController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const featureId = Number(req.params.id);
        try {
            await this.featureService.delete(featureId);
            return res.json({ message: 'Feature deleted successfully' });
        }
        catch (error) {
            console.error('Error in FeatureController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=feature.controller.js.map