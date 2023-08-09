import { Request, Response } from 'express';
import { BenefitService } from './benefit.service';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

export class BenefitController {
  constructor(
    private readonly benefitService: BenefitService = new BenefitService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.benefitService.getAll(courseId, page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const createBenefitDto: CreateBenefitDto[] = req.body;

    const createdData: any = [];

    createBenefitDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].courseId = courseId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.benefitService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in BenefitController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const updatebenefitDto: UpdateBenefitDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    updatebenefitDto.forEach((item) => {
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
        await this.benefitService.create(createdData);
      }
      if (updatedData.length > 0) {
        await this.benefitService.update(updatedData);
      }
      return res.json({ message: 'Benefit updated successfully' });
    } catch (error) {
      console.error('Error in BenefitController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const benefitId = Number(req.params.id);

    try {
      await this.benefitService.delete(benefitId);
      return res.json({ message: 'Benefit deleted successfully' });
    } catch (error) {
      console.error('Error in BenefitController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
