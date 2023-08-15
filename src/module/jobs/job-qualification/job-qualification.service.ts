import { db } from '../../../db/database';
import { jobs_Qualification, jobs } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { CreatejobQualificationDto } from './dto/create-job-qualification.dto';
import { UpdatejobQualificationDto } from './dto/update-job-qualification.dto';

export class JobQualificationService {
  async getAll(jobId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }
    const offset = (page - 1) * limit;
    const pagejobQualification = await db
      .select({
        id: jobs_Qualification.id,
        qualification: jobs_Qualification.qualification,
      })
      .from(jobs_Qualification)
      .where(
        sql`jobs_Qualification.jobId = ${jobId} and jobs.deletedAt is null`,
      )
      .leftJoin(jobs, eq(jobs_Qualification.jobId, jobs.id))
      .limit(limit)
      .offset(offset);

    if (pagejobQualification.length === 0) {
      return { message: 'No jobQualification found' };
    }
    return pagejobQualification;
  }
  async create(CreatejobQualificationDto: CreatejobQualificationDto) {
    await db.insert(jobs_Qualification).values(CreatejobQualificationDto);
    return 'jobQualification created successfully!';
  }

  async update(UpdatejobQualificationDto: UpdatejobQualificationDto[]) {
    try {
      for (const dto of UpdatejobQualificationDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db
          .update(jobs_Qualification)
          .set(dto)
          .where(eq(jobs_Qualification.id, dto.id));
      }

      return 'jobQualification updated successfully!';
    } catch (error) {
      console.error('Error in jobQualificationService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(jobs_Qualification).where(eq(jobs_Qualification.id, id));

    return 'jobQualification deleted successfully!';
  }
}
