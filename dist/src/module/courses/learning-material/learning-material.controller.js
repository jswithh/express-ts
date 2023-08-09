import { LearningMaterialService } from './learning-material.service';
export class LearningMaterialController {
    learningMaterialService;
    constructor(learningMaterialService = new LearningMaterialService()) {
        this.learningMaterialService = learningMaterialService;
    }
    getAll = async (req, res) => {
        try {
            const courseId = Number(req.params.courseId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const courses = await this.learningMaterialService.getAll(courseId, page, limit);
            return res.json(courses);
        }
        catch (error) {
            console.error('Error in CoursesController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createlearningMaterialDto = req.body;
        const createdData = [];
        createlearningMaterialDto.forEach((item) => {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
        });
        try {
            if (createdData.length > 0) {
                const result = await this.learningMaterialService.create(createdData);
                return res.status(201).json({ message: result });
            }
        }
        catch (error) {
            console.error('Error in LearningMaterialController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatelearningMaterialDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatelearningMaterialDto.forEach((item) => {
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
                await this.learningMaterialService.create(createdData);
            }
            if (updatedData.length > 0) {
                await this.learningMaterialService.update(updatedData);
            }
            return res.json({ message: 'Learning Material updated successfully' });
        }
        catch (error) {
            console.error('Error in LearningMaterialController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const learningmaterialId = Number(req.params.id);
        try {
            await this.learningMaterialService.delete(learningmaterialId);
            return res.json({ message: 'Learning Material deleted successfully' });
        }
        catch (error) {
            console.error('Error in LearningMaterialController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=learning-material.controller.js.map