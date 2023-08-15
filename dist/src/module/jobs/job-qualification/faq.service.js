import { db } from '../../../db/database';
import { course_Faq, courses } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
export class FaqService {
    async getAll(courseId, page, limit) {
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
            .where(sql `course_Faq.courseId = ${courseId} and courses.deletedAt is null`)
            .leftJoin(courses, eq(course_Faq.courseId, courses.id))
            .limit(limit)
            .offset(offset);
        if (pageFaq.length === 0) {
            return { message: 'No Faq found' };
        }
        return pageFaq;
    }
    async create(CreateFaqDto) {
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
    async update(UpdateFaqDto) {
        try {
            for (const dto of UpdateFaqDto) {
                if (!dto.id) {
                    throw new Error('Invalid data. "id" is required for update.');
                }
                await db.update(course_Faq).set(dto).where(eq(course_Faq.id, dto.id));
            }
            return 'Faq updated successfully!';
        }
        catch (error) {
            console.error('Error in FaqService.update:', error);
            throw new Error('Failed to update Learning Material');
        }
    }
    async delete(id) {
        await db.delete(course_Faq).where(eq(course_Faq.id, id));
        return 'Faq deleted successfully!';
    }
}
//# sourceMappingURL=faq.service.js.map