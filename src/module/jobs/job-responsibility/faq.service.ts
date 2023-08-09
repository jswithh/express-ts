import { db } from '../../../db/database';
import { course_Faq, courses } from '../../../db/schema';
import { eq, isNull, sql } from 'drizzle-orm';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

export class FaqService {
  async getAll(courseId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }
    const offset = (page - 1) * limit;
    const pageFaq = await db
      .select({
        id: course_Faq.id,
        kkni: course_Faq.question,
        kkni_title: course_Faq.answer,
      })
      .from(course_Faq)
      .where(
        sql`course_Faq.courseId = ${courseId} and courses.deletedAt is null`,
      )
      .leftJoin(courses, eq(course_Faq.courseId, courses.id))
      .limit(limit)
      .offset(offset);

    if (pageFaq.length === 0) {
      return { message: 'No Faq found' };
    }
    return pageFaq;
  }
  async create(CreateFaqDto: CreateFaqDto) {
    const existingFaq = await db
      .select({
        kkni: course_Faq.question,
      })
      .from(course_Faq)
      .where(eq(course_Faq.question, CreateFaqDto.question));

    if (existingFaq.length > 0) {
      throw new Error('Learning Material already exists');
    }
    await db.insert(course_Faq).values(CreateFaqDto);
    return 'Faq created successfully!';
  }

  async update(UpdateFaqDto: UpdateFaqDto[]) {
    try {
      for (const dto of UpdateFaqDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db.update(course_Faq).set(dto).where(eq(course_Faq.id, dto.id));
      }

      return 'Faq updated successfully!';
    } catch (error) {
      console.error('Error in FaqService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(course_Faq).where(eq(course_Faq.id, id));

    return 'Faq deleted successfully!';
  }
}
