import { Request, Response } from 'express';
import { businessLineService } from './business-line.service';
import { CreatebusinessLineDto } from './dto/create-business-line.dto';
import { UpdatebusinessLineDto } from './dto/update-business-line.dto';

export class BusinessLineController {
  constructor(
    private readonly businesslineService: businessLineService = new businessLineService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const businessline = await this.businesslineService.getAll(page, limit);
      return res.json(businessline);
    } catch (error) {
      console.error('Error in BusinessLineController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const CreatebusinessLineDto: CreatebusinessLineDto = req.body;
    try {
      const result = await this.businesslineService.create(
        CreatebusinessLineDto,
      );
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in BusinessLineController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const pageUrl = req.params.url;
      const page = await this.businesslineService.show(pageUrl);

      return res.json(page);
    } catch (error) {
      console.error('Error in BusinessLineController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const pageId = Number(req.params.id);
    const UpdatebusinessLineDto: UpdatebusinessLineDto = req.body;

    try {
      await this.businesslineService.update(pageId, UpdatebusinessLineDto);
      return res.json({ message: 'Page updated successfully' });
    } catch (error) {
      console.error('Error in BusinessLineController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const pageId = Number(req.params.id);

    try {
      const page = await this.businesslineService.delete(pageId);
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }

      await this.businesslineService.delete(pageId);
      return res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      console.error('Error in BusinessLineController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
