import { db } from '../../../db/database';
import { jobs_Responsibility, jobs } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { CreatejobResponsibilityDto } from './dto/create-job-responsibility.dto';
import { UpdatejobResponsibilityDto } from './dto/update-job-responsibility.dto';

export class JobResponsibilityService {
  async getAll(jobId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }
    const offset = (page - 1) * limit;
    const pagejobResponsibility = await db
      .select({
        id: jobs_Responsibility.id,
        responsibility: jobs_Responsibility.responsibility,
      })
      .from(jobs_Responsibility)
      .where(
        sql`jobs_Responsibility.jobId = ${jobId} and jobs.deletedAt is null`,
      )
      .leftJoin(jobs, eq(jobs_Responsibility.jobId, jobs.id))
      .limit(limit)
      .offset(offset);

    if (pagejobResponsibility.length === 0) {
      return { message: 'No jobResponsibility found' };
    }
    return pagejobResponsibility;
  }
  async create(CreatejobResponsibilityDto: CreatejobResponsibilityDto) {
    await db.insert(jobs_Responsibility).values(CreatejobResponsibilityDto);
    return 'jobResponsibility created successfully!';
  }

  async update(UpdatejobResponsibilityDto: UpdatejobResponsibilityDto[]) {
    try {
      for (const dto of UpdatejobResponsibilityDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db
          .update(jobs_Responsibility)
          .set(dto)
          .where(eq(jobs_Responsibility.id, dto.id));
      }

      return 'jobResponsibility updated successfully!';
    } catch (error) {
      console.error('Error in jobResponsibilityService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(jobs_Responsibility).where(eq(jobs_Responsibility.id, id));

    return 'jobResponsibility deleted successfully!';
  }
}
