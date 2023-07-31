import { Request, Response } from 'express';
import { CoursesService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService = new CoursesService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.coursesService.getAll(page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createCourseDto: CreateCourseDto = req.body;

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const heroImg = files.heroImg[0].path.replace('public', '');
      const thumbnail = files.thumbnail[0].path.replace('public', '');
      createCourseDto.heroImg = heroImg;
      createCourseDto.thumbnail = thumbnail;
    }
    try {
      const result = await this.coursesService.create(createCourseDto);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error in CoursesController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const courseSlug = req.params.slug;
      const course = await this.coursesService.show(courseSlug);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      return res.json(course);
    } catch (error) {
      console.error('Error in CoursesController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const courseSlug = req.params.slug;
    const updateCourseDto: UpdateCourseDto = req.body;

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (typeof files.heroImg === 'object') {
        updateCourseDto.heroImg = files.heroImg[0].path.replace('public', '');
      }

      if (typeof files.thumbnail === 'object') {
        updateCourseDto.thumbnail = files.thumbnail[0].path.replace(
          'public',
          '',
        );
      }
    }

    try {
      await this.coursesService.update(courseSlug, updateCourseDto);
      return res.json({ message: 'Course updated successfully' });
    } catch (error) {
      console.error('Error in CoursesController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const courseSlug = req.params.slug;

    try {
      await this.coursesService.delete(courseSlug);
      return res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error in CoursesController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  coursesDraft = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const courses = await this.coursesService.coursesDraft(page, limit);
      return res.json(courses);
    } catch (error) {
      console.error('Error in CoursesController.coursesDraft:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
