import { db } from '../../../db/database';
import { course_Benefit, courses } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

export class BenefitService {
  async getAll(courseId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }
    const offset = (page - 1) * limit;
    const pageBenefit = await db
      .select({
        id: course_Benefit.id,
        benefit: course_Benefit.benefit,
      })
      .from(course_Benefit)
      .where(
        sql`course_Benefit.slug = ${courseId} and courses.deletedAt is null`,
      )
      .leftJoin(courses, eq(course_Benefit.courseId, courses.id))
      .limit(limit)
      .offset(offset);

    if (pageBenefit.length === 0) {
      return { message: 'No Benefit found' };
    }
    return pageBenefit;
  }
  async create(CreateBenefitDto: CreateBenefitDto) {
    await db.insert(course_Benefit).values(CreateBenefitDto);
    return 'Benefit created successfully!';
  }

  async update(UpdateBenefitDto: UpdateBenefitDto[]) {
    try {
      for (const dto of UpdateBenefitDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db
          .update(course_Benefit)
          .set(dto)
          .where(eq(course_Benefit.id, dto.id));
      }

      return 'Benefit updated successfully!';
    } catch (error) {
      console.error('Error in BenefitService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(course_Benefit).where(eq(course_Benefit.id, id));

    return 'Benefit deleted successfully!';
  }
}
