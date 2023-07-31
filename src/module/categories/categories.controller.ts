import { Request, Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService = new CategoriesService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const categories = await this.categoriesService.getAll(page, limit);
      return res.json(categories);
    } catch (error) {
      console.error('Error in CategoriesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createCategoryDto: CreateCategoryDto = req.body;
    try {
      const result = await this.categoriesService.create(createCategoryDto);
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in CategoriesController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const categorySlug = req.params.slug;
      const category = await this.categoriesService.show(categorySlug);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.json(category);
    } catch (error) {
      console.error('Error in CategoriesController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const categorySlug = req.params.slug;
    const updateCategoryDto: UpdateCategoryDto = req.body;

    try {
      await this.categoriesService.update(categorySlug, updateCategoryDto);
      return res.json({ message: 'Category updated successfully' });
    } catch (error) {
      console.error('Error in CategoriesController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const categorySlug = req.params.slug;

    try {
      await this.categoriesService.delete(categorySlug);
      return res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error in CategoriesController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
