import { Request, Response } from 'express';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

export class FaqController {
  constructor(private readonly faqService: FaqService = new FaqService()) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.faqService.getAll(courseId, page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const createFaqDto: CreateFaqDto[] = req.body;

    const createdData: any = [];

    createFaqDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].courseId = courseId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.faqService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in FaqController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const updatefaqDto: UpdateFaqDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    updatefaqDto.forEach((item) => {
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
        await this.faqService.create(createdData);
      }
      if (updatedData.length > 0) {
        await this.faqService.update(updatedData);
      }
      return res.json({ message: 'Faq updated successfully' });
    } catch (error) {
      console.error('Error in FaqController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const faqId = Number(req.params.id);

    try {
      await this.faqService.delete(faqId);
      return res.json({ message: 'Faq deleted successfully' });
    } catch (error) {
      console.error('Error in FaqController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
