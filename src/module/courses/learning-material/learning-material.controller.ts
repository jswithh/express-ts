import { Request, Response } from 'express';
import { LearningMaterialService } from './learning-material.service';
import { CreatelearningMaterialDto } from './dto/create-learning-material.dto';
import { UpdatelearningMaterialDto } from './dto/update-learning-material.dto';

export class LearningMaterialController {
  constructor(
    private readonly learningMaterialService: LearningMaterialService = new LearningMaterialService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const courseId = Number(req.params.courseId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.learningMaterialService.getAll(
        courseId,
        page,
        limit,
      );
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const createlearningMaterialDto: CreatelearningMaterialDto[] = req.body;

    const createdData: any = [];

    createlearningMaterialDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].courseId = courseId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.learningMaterialService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in LearningMaterialController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseId = Number(req.params.courseId);
    const updatelearningMaterialDto: UpdatelearningMaterialDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    updatelearningMaterialDto.forEach((item) => {
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
        await this.learningMaterialService.create(createdData);
      }
      if (updatedData.length > 0) {
        await this.learningMaterialService.update(updatedData);
      }

      return res.json({ message: 'Learning Material updated successfully' });
    } catch (error) {
      console.error('Error in LearningMaterialController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const learningmaterialId = Number(req.params.id);

    try {
      await this.learningMaterialService.delete(learningmaterialId);
      return res.json({ message: 'Learning Material deleted successfully' });
    } catch (error) {
      console.error('Error in LearningMaterialController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
