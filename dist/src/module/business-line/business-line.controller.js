import { businessLineService } from './business-line.service';
export class BusinessLineController {
    businesslineService;
    constructor(businesslineService = new businessLineService()) {
        this.businesslineService = businesslineService;
    }
    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const businessline = await this.businesslineService.getAll(page, limit);
            return res.json(businessline);
        }
        catch (error) {
            console.error('Error in BusinessLineController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const CreatebusinessLineDto = req.body;
        try {
            const result = await this.businesslineService.create(CreatebusinessLineDto);
            return res.status(201).json({ message: result });
        }
        catch (error) {
            console.error('Error in BusinessLineController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    show = async (req, res) => {
        try {
            const pageUrl = req.params.url;
            const page = await this.businesslineService.show(pageUrl);
            return res.json(page);
        }
        catch (error) {
            console.error('Error in BusinessLineController.show:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const pageId = Number(req.params.id);
        const UpdatebusinessLineDto = req.body;
        try {
            await this.businesslineService.update(pageId, UpdatebusinessLineDto);
            return res.json({ message: 'Page updated successfully' });
        }
        catch (error) {
            console.error('Error in BusinessLineController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const pageId = Number(req.params.id);
        try {
            const page = await this.businesslineService.delete(pageId);
            if (!page) {
                return res.status(404).json({ error: 'Page not found' });
            }
            await this.businesslineService.delete(pageId);
            return res.json({ message: 'Page deleted successfully' });
        }
        catch (error) {
            console.error('Error in BusinessLineController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=business-line.controller.js.map