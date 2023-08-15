import { db } from '../../../db/database';
import { jobs } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
export class JobService {
    async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        try {
            const offset = (page - 1) * limit;
            const pageJob = await db
                .select({
                id: jobs.id,
                title: jobs.title,
                slug: jobs.slug,
                images: jobs.images,
            })
                .from(jobs)
                .where(sql `jobs.deletedAt is null and jobs.status = 'published'`)
                .limit(limit)
                .offset(offset);
            if (pageJob.length === 0) {
                return 'Job not found';
            }
            return pageJob;
        }
        catch (error) {
            console.error('Error in JobService.getAll:', error);
            throw new Error('Failed to get Job');
        }
    }
    async show(slug) {
        try {
            const job = await db
                .select({
                title: jobs.title,
                slug: jobs.slug,
                images: jobs.images,
            })
                .from(jobs)
                .where(sql `jobs.slug = ${slug} and jobs.deletedAt is null and jobs.status = 'published'`);
            if (job.length === 0) {
                return 'Job not found';
            }
            return job[0];
        }
        catch (error) {
            console.error('Error in JobService.show:', error);
            return 'Job not found';
        }
    }
    async create(CreateJobDto) {
        try {
            CreateJobDto.slug = slugify(CreateJobDto.title, {
                replacement: '-',
                lower: true,
            });
            await db.insert(jobs).values(CreateJobDto);
            return 'Job created successfully!';
        }
        catch (error) {
            console.error('Error in JobService.create:', error);
            throw new Error('Failed to create Job');
        }
    }
    async update(slug, UpdateJobDto) {
        try {
            if (UpdateJobDto.title) {
                UpdateJobDto.slug = slugify(UpdateJobDto.title, {
                    replacement: '-',
                    lower: true,
                });
            }
            await db.update(jobs).set(UpdateJobDto).where(eq(jobs.slug, slug));
            return 'Job updated successfully!';
        }
        catch (error) {
            console.error('Error in JobService.update:', error);
            throw new Error('Failed to update Jobs');
        }
    }
    async delete(slug) {
        try {
            await db
                .update(jobs)
                .set({ deletedAt: new Date() })
                .where(eq(jobs.slug, slug));
            return 'Job deleted successfully!';
        }
        catch (error) {
            console.error('Error in JobService.delete:', error);
            throw new Error('Failed to delete Job');
        }
    }
}
//# sourceMappingURL=job.service.js.map