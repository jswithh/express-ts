import { Request, Response } from 'express';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

export class FeatureController {
  constructor(
    private readonly featureService: FeatureService = new FeatureService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.featureService.getAll(courseId, page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const createFeatureDto: CreateFeatureDto[] = req.body;

    const createdData: any = [];

    createFeatureDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].courseId = courseId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.featureService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in FeatureController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const updatefeatureDto: UpdateFeatureDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    updatefeatureDto.forEach((item) => {
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
        await this.featureService.create(createdData);
      }
      if (updatedData.length > 0) {
        await this.featureService.update(updatedData);
      }
      return res.json({ message: 'Feature updated successfully' });
    } catch (error) {
      console.error('Error in FeatureController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const featureId = Number(req.params.id);

    try {
      await this.featureService.delete(featureId);
      return res.json({ message: 'Feature deleted successfully' });
    } catch (error) {
      console.error('Error in FeatureController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
