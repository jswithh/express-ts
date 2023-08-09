import { SeoService } from './seo.service';
export class SeoController {
    seoService;
    constructor(seoService = new SeoService()) {
        this.seoService = seoService;
    }
    getAll = async (req, res) => {
        try {
            const blogId = Number(req.params.blogId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const blogs = await this.seoService.getAll(blogId, page, limit);
            return res.json(blogs);
        }
        catch (error) {
            console.error('Error in BlogsController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const blogId = Number(req.params.blogId);
        const createSeoDto = req.body;
        const createdData = [];
        createSeoDto.forEach((item) => {
            createdData.push(item);
            createdData[createdData.length - 1].blogId = blogId;
        });
        try {
            if (createdData.length > 0) {
                const result = await this.seoService.create(createdData);
                return res.status(201).json({ message: result });
            }
        }
        catch (error) {
            console.error('Error in SeoController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const blogId = Number(req.params.blogId);
        const updateseoDto = req.body;
        const createdData = [];
        const updatedData = [];
        updateseoDto.forEach((item) => {
            if (item && item.hasOwnProperty('id')) {
                updatedData.push(item);
                updatedData[updatedData.length - 1].blogId = blogId;
            }
            else {
                createdData.push(item);
                createdData[createdData.length - 1].blogId = blogId;
            }
        });
        try {
            if (createdData.length > 0) {
                await this.seoService.create(createdData);
            }
            if (updatedData.length > 0) {
                await this.seoService.update(updatedData);
            }
            return res.json({ message: 'Seo updated successfully' });
        }
        catch (error) {
            console.error('Error in SeoController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const seoId = Number(req.params.id);
        try {
            await this.seoService.delete(seoId);
            return res.json({ message: 'Seo deleted successfully' });
        }
        catch (error) {
            console.error('Error in SeoController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=seo.controller.js.map