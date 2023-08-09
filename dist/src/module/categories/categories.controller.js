import { CategoriesService } from './categories.service';
export class CategoriesController {
    categoriesService;
    constructor(categoriesService = new CategoriesService()) {
        this.categoriesService = categoriesService;
    }
    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const categories = await this.categoriesService.getAll(page, limit);
            return res.json(categories);
        }
        catch (error) {
            console.error('Error in CategoriesController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const createCategoryDto = req.body;
        try {
            const result = await this.categoriesService.create(createCategoryDto);
            return res.status(201).json({ message: result });
        }
        catch (error) {
            console.error('Error in CategoriesController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    show = async (req, res) => {
        try {
            const categorySlug = req.params.slug;
            const category = await this.categoriesService.show(categorySlug);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            return res.json(category);
        }
        catch (error) {
            console.error('Error in CategoriesController.show:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const categorySlug = req.params.slug;
        const updateCategoryDto = req.body;
        try {
            await this.categoriesService.update(categorySlug, updateCategoryDto);
            return res.json({ message: 'Category updated successfully' });
        }
        catch (error) {
            console.error('Error in CategoriesController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const categorySlug = req.params.slug;
        try {
            const category = await this.categoriesService.show(categorySlug);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await this.categoriesService.delete(categorySlug);
            return res.json({ message: 'Category deleted successfully' });
        }
        catch (error) {
            console.error('Error in CategoriesController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=categories.controller.js.map