import { db } from '../../../db/database';
import { course_Testimonial, courses } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
export class TestimonialService {
    async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        const offset = (page - 1) * limit;
        const pageTestimonial = await db
            .select({
            id: course_Testimonial.id,
            star: course_Testimonial.star,
            name: course_Testimonial.name,
            profileImg: course_Testimonial.profileImg,
            review: course_Testimonial.review,
        })
            .from(course_Testimonial)
            .where(sql `course_Testimonial.courseId = ${courseId} and courses.deletedAt is null`)
            .leftJoin(courses, eq(course_Testimonial.courseId, courses.id))
            .limit(limit)
            .offset(offset);
        return pageTestimonial;
    }
    async create(CreateTestimonialDto) {
        try {
            await db.insert(course_Testimonial).values(CreateTestimonialDto);
            return 'Testimonial created successfully!';
        }
        catch (error) {
            console.error('Error in TestimonialService.create:', error);
            throw new Error('Failed to create Testimonial');
        }
    }
    async update(testimonialId, UpdateTestimonialDto) {
        try {
            await db
                .update(course_Testimonial)
                .set(UpdateTestimonialDto)
                .where(eq(course_Testimonial.id, testimonialId));
            return 'Testimonial updated successfully!';
        }
        catch (error) {
            console.error('Error in TestimonialService.update:', error);
            throw new Error('Failed to update Learning Material');
        }
    }
    async delete(id) {
        await db.delete(course_Testimonial).where(eq(course_Testimonial.id, id));
        return 'Testimonial deleted successfully!';
    }
}
//# sourceMappingURL=testimonial.service.js.map