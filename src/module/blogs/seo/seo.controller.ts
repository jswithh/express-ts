import { Request, Response } from 'express';
import { SeoService } from './seo.service';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';

export class SeoController {
  constructor(private readonly seoService: SeoService = new SeoService()) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.seoService.getAll(courseId, page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const createSeoDto: CreateSeoDto[] = req.body;

    const createdData: any = [];

    createSeoDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].courseId = courseId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.seoService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in SeoController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const updateseoDto: UpdateSeoDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    updateseoDto.forEach((item) => {
      if (item && item.hasOwnProperty('id')) {
        updatedData.push(item);
        updatedData[updatedData.length - 1].courseId = courseId;
      } else {
        createdData.push(item);
        createdData[createdData.length - 1].courseId = courseId;
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
    } catch (error) {
      console.error('Error in SeoController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const seoId = Number(req.params.id);

    try {
      await this.seoService.delete(seoId);
      return res.json({ message: 'Seo deleted successfully' });
    } catch (error) {
      console.error('Error in SeoController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
