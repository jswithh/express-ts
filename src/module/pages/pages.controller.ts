import { Request, Response } from 'express';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

export class PagesController {
  constructor(
    private readonly pagesService: PagesService = new PagesService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const pages = await this.pagesService.getAll(page, limit);
      return res.json(pages);
    } catch (error) {
      console.error('Error in PagesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createPageDto: CreatePageDto = req.body;
    try {
      const result = await this.pagesService.create(createPageDto);
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in PagesController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const pageUrl = req.params.url;
      const page = await this.pagesService.show(pageUrl);

      return res.json(page);
    } catch (error) {
      console.error('Error in PagesController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const pageId = Number(req.params.id);
    const updatePageDto: UpdatePageDto = req.body;

    try {
      await this.pagesService.update(pageId, updatePageDto);
      return res.json({ message: 'Page updated successfully' });
    } catch (error) {
      console.error('Error in PagesController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const pageId = Number(req.params.id);

    try {
      const page = await this.pagesService.delete(pageId);
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }

      await this.pagesService.delete(pageId);
      return res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      console.error('Error in PagesController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
