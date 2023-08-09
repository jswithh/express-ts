import { Request, Response } from 'express';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import fs from 'fs';
import sharp from 'sharp';

export class JobController {
  constructor(private readonly jobService: JobService = new JobService()) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const job = await this.jobService.getAll(page, limit);
      return res.json(job);
    } catch (error) {
      console.error('Error in JobController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const jobSlug = req.params.slug;
      const job = await this.jobService.show(jobSlug);
      return res.json(job);
    } catch (error) {
      console.error('Error in JobController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createJobDto: CreateJobDto = req.body;

    if (req.file) {
      console.log(req.file);
      fs.access('./public/images/job/', (err) => {
        if (err) {
          console.log('Directory does not exist.');
        }
      });
      const { buffer } = req.file;
      const timestamp = new Date().getTime(); // Menggunakan timestamp dalam milidetik
      const randomSuffix = Math.floor(Math.random() * 10000); // Menambahkan angka acak untuk mencegah kemungkinan tabrakan
      const ref = `${timestamp}-${randomSuffix}.webp`;

      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile('./public/images/job/' + ref);
      const link = `/images/job/${ref}`;
      createJobDto.images = link;
    }

    try {
      const result = await this.jobService.create(createJobDto);
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in JobController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const jobSlug = req.params.slug;
    const updatejobDto: UpdateJobDto = req.body;

    if (req.file) {
      console.log(req.file);
      fs.access('./public/images/job/', (err) => {
        if (err) {
          console.log('Directory does not exist.');
        }
      });
      const { buffer } = req.file;
      const timestamp = new Date().getTime(); // Menggunakan timestamp dalam milidetik
      const randomSuffix = Math.floor(Math.random() * 10000); // Menambahkan angka acak untuk mencegah kemungkinan tabrakan
      const ref = `${timestamp}-${randomSuffix}.webp`;
      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile('./public/images/job/' + ref);
      const link = `/images/job/${ref}`;
      updatejobDto.images = link;
    }

    try {
      const result = await this.jobService.update(jobSlug, updatejobDto);
      return res.json({ message: result });
    } catch (error) {
      console.error('Error in JobController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const jobSlug = req.params.slug;

    try {
      await this.jobService.delete(jobSlug);
      return res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error in JobController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
