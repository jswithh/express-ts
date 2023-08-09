import { db } from '../../../db/database';
import { jobs } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

export class JobService {
  async getAll(page: number, limit: number) {
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
        .where(sql`status = 'published' AND deleted_at IS NULL`)
        .limit(limit)
        .offset(offset);

      if (pageJob.length === 0) {
        return 'Job not found';
      }

      return pageJob;
    } catch (error) {
      console.error('Error in JobService.getAll:', error);
      throw new Error('Failed to get Job');
    }
  }

  async show(slug: string) {
    try {
      const job = await db
        .select({
          title: jobs.title,
          slug: jobs.slug,
          images: jobs.images,
        })
        .from(jobs)
        .where(
          sql`slug = ${slug} AND status = 'published' AND deleted_at IS NULL`,
        );

      if (job.length === 0) {
        return 'Job not found';
      }

      return job[0];
    } catch (error) {
      console.error('Error in JobService.show:', error);
      throw new Error('Failed to get Job');
    }
  }
  async create(CreateJobDto: CreateJobDto) {
    try {
      await db.insert(jobs).values(CreateJobDto);
      return 'Job created successfully!';
    } catch (error) {
      console.error('Error in JobService.create:', error);
      throw new Error('Failed to create Job');
    }
  }

  async update(slug: string, UpdateJobDto: UpdateJobDto) {
    try {
      await db.update(jobs).set(UpdateJobDto).where(eq(jobs.slug, slug));

      return 'Job updated successfully!';
    } catch (error) {
      console.error('Error in JobService.update:', error);
      throw new Error('Failed to update Jobs');
    }
  }

  async delete(slug: string) {
    await db.delete(jobs).where(eq(jobs.slug, slug));

    return 'Job deleted successfully!';
  }
}
