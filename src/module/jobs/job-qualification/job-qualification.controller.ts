import { Request, Response } from 'express';
import { JobQualificationService } from './job-qualification.service';
import { CreatejobQualificationDto } from './dto/create-job-qualification.dto';
import { UpdatejobQualificationDto } from './dto/update-job-qualification.dto';

export class JobsQualificationController {
  constructor(
    private readonly jobsQualificationService: JobQualificationService = new JobQualificationService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const jobId = Number(req.params.jobId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const jobs = await this.jobsQualificationService.getAll(
        jobId,
        page,
        limit,
      );
      return res.json(jobs);
    } catch (error) {
      console.error('Error in jobsController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const jobId = Number(req.params.jobId);
    const CreatejobQualificationDto: CreatejobQualificationDto[] = req.body;

    const createdData: any = [];

    CreatejobQualificationDto.forEach((item) => {
      createdData.push(item);
      createdData[createdData.length - 1].jobId = jobId;
    });
    try {
      if (createdData.length > 0) {
        const result = await this.jobsQualificationService.create(createdData);
        return res.status(201).json({ message: result });
      }
    } catch (error) {
      console.error('Error in Jobs_QualificationController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const jobId = Number(req.params.jobId);
    const UpdatejobQualificationDto: UpdatejobQualificationDto[] = req.body;

    const createdData: any = [];
    const updatedData: any = [];

    UpdatejobQualificationDto.forEach((item) => {
      if (item && item.hasOwnProperty('id')) {
        updatedData.push(item);
        updatedData[updatedData.length - 1].jobId = jobId;
      } else {
        createdData.push(item);
        createdData[createdData.length - 1].jobId = jobId;
      }
    });

    try {
      if (createdData.length > 0) {
        await this.jobsQualificationService.create(createdData);
      }
      if (updatedData.length > 0) {
        await this.jobsQualificationService.update(updatedData);
      }
      return res.json({ message: 'Jobs_Qualification updated successfully' });
    } catch (error) {
      console.error('Error in Jobs_QualificationController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const jobs_qualificationId = Number(req.params.id);

    try {
      await this.jobsQualificationService.delete(jobs_qualificationId);
      return res.json({ message: 'Jobs_Qualification deleted successfully' });
    } catch (error) {
      console.error('Error in Jobs_QualificationController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
