import { Request, Response } from 'express';
import { Jobs_DocumentService } from './job-document.service';
import { CreatejobDocumentDto } from './dto/create-job-document.dto';
import fs from 'fs';

export class JobDocumentController {
  constructor(
    private readonly jobs_DocumentService: Jobs_DocumentService = new Jobs_DocumentService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const job = await this.jobs_DocumentService.getAll(page, limit);
      return res.json(job);
    } catch (error) {
      console.error('Error in JobController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const jobId = Number(req.params.jobId);
    const CreatejobDocumentDto: CreatejobDocumentDto = req.body;

    try {
      if (req.file) {
        fs.access('./public/documents/job/', (err) => {
          if (err) {
            console.log('Directory does not exist.');
          }
        });
        const { buffer } = req.file;
        const timestamp = new Date().getTime();
        const randomSuffix = Math.floor(Math.random() * 10000);
        const ref = `${timestamp}-${randomSuffix}.pdf`;

        fs.writeFileSync('./public/documents/job/' + ref, buffer, 'binary');
        const link = `/documents/job/${ref}`;
        CreatejobDocumentDto.document = link;
      }
      console.log(CreatejobDocumentDto.document);
      const result = await this.jobs_DocumentService.create(
        jobId,
        CreatejobDocumentDto,
      );
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in JobController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const jobId = Number(req.params.jobId);

    try {
      await this.jobs_DocumentService.delete(jobId);
      return res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error in JobController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
