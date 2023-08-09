import { TestimonialService } from './testimonial.service';
import fs from 'fs';
import sharp from 'sharp';
export class TestimonialController {
    testimonialService;
    constructor(testimonialService = new TestimonialService()) {
        this.testimonialService = testimonialService;
    }
    getAll = async (req, res) => {
        try {
            const courseId = Number(req.params.courseId);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const courses = await this.testimonialService.getAll(courseId, page, limit);
            return res.json(courses);
        }
        catch (error) {
            console.error('Error in CoursesController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createTestimonialDto = req.body;
        if (req.file) {
            console.log(req.file);
            fs.access('./public/images/testimonial/', (err) => {
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
                .toFile('./public/images/testimonial/' + ref);
            const link = `/images/testimonial/${ref}`;
            createTestimonialDto.profileImg = link;
        }
        createTestimonialDto.courseId = courseId;
        try {
            const result = await this.testimonialService.create(createTestimonialDto);
            return res.status(201).json({ message: result });
        }
        catch (error) {
            console.error('Error in TestimonialController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const testimonialId = Number(req.params.id);
        const updatetestimonialDto = req.body;
        if (req.file) {
            console.log(req.file);
            fs.access('./public/images/testimonial/', (err) => {
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
                .toFile('./public/images/testimonial/' + ref);
            const link = `/images/testimonial/${ref}`;
            updatetestimonialDto.profileImg = link;
        }
        try {
            const result = await this.testimonialService.update(testimonialId, updatetestimonialDto);
            return res.json({ message: result });
        }
        catch (error) {
            console.error('Error in TestimonialController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const testimonialId = Number(req.params.id);
        try {
            await this.testimonialService.delete(testimonialId);
            return res.json({ message: 'Testimonial deleted successfully' });
        }
        catch (error) {
            console.error('Error in TestimonialController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=testimonial.controller.js.map