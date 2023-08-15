import { JobService } from './job.service';
import fs from 'fs';
import sharp from 'sharp';
export class JobController {
    jobService;
    constructor(jobService = new JobService()) {
        this.jobService = jobService;
    }
    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const job = await this.jobService.getAll(page, limit);
            return res.json(job);
        }
        catch (error) {
            console.error('Error in JobController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    show = async (req, res) => {
        try {
            const jobSlug = req.params.slug;
            const job = await this.jobService.show(jobSlug);
            return res.json(job);
        }
        catch (error) {
            console.error('Error in JobController.show:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const createJobDto = req.body;
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
        }
        catch (error) {
            console.error('Error in JobController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const jobSlug = req.params.slug;
        const updatejobDto = req.body;
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
        }
        catch (error) {
            console.error('Error in JobController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const jobSlug = req.params.slug;
        try {
            await this.jobService.delete(jobSlug);
            return res.json({ message: 'Job deleted successfully' });
        }
        catch (error) {
            console.error('Error in JobController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=job.controller.js.map