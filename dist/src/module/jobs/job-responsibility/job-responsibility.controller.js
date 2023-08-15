import { JobResponsibilityService } from './job-responsibility.service';
export class JobsResponsibilityController {
    jobsResponsibilityService;
    constructor(jobsResponsibilityService = new JobResponsibilityService()) {
        this.jobsResponsibilityService = jobsResponsibilityService;
    }
    getAll = async (req, res) => {
        try {
            const jobId = Number(req.params.jobId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const jobs = await this.jobsResponsibilityService.getAll(jobId, page, limit);
            return res.json(jobs);
        }
        catch (error) {
            console.error('Error in jobsController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const jobId = Number(req.params.jobId);
        const CreatejobResponsibilityDto = req.body;
        const createdData = [];
        CreatejobResponsibilityDto.forEach((item) => {
            createdData.push(item);
            createdData[createdData.length - 1].jobId = jobId;
        });
        try {
            if (createdData.length > 0) {
                const result = await this.jobsResponsibilityService.create(createdData);
                return res.status(201).json({ message: result });
            }
        }
        catch (error) {
            console.error('Error in Jobs_ResponsibilityController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const jobId = Number(req.params.jobId);
        const UpdatejobResponsibilityDto = req.body;
        const createdData = [];
        const updatedData = [];
        UpdatejobResponsibilityDto.forEach((item) => {
            if (item && item.hasOwnProperty('id')) {
                updatedData.push(item);
                updatedData[updatedData.length - 1].jobId = jobId;
            }
            else {
                createdData.push(item);
                createdData[createdData.length - 1].jobId = jobId;
            }
        });
        try {
            if (createdData.length > 0) {
                await this.jobsResponsibilityService.create(createdData);
            }
            if (updatedData.length > 0) {
                await this.jobsResponsibilityService.update(updatedData);
            }
            return res.json({ message: 'Jobs_Responsibility updated successfully' });
        }
        catch (error) {
            console.error('Error in Jobs_ResponsibilityController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const jobs_responsibilityId = Number(req.params.id);
        try {
            await this.jobsResponsibilityService.delete(jobs_responsibilityId);
            return res.json({ message: 'Jobs_Responsibility deleted successfully' });
        }
        catch (error) {
            console.error('Error in Jobs_ResponsibilityController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=job-responsibility.controller.js.map