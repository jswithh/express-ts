import { db } from '../../../db/database';
import { course_Feature, courses } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
export class FeatureService {
    async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        const offset = (page - 1) * limit;
        const pageFeature = await db
            .select({
            id: course_Feature.id,
            feature: course_Feature.feature,
        })
            .from(course_Feature)
            .where(sql `course_Feature.courseId = ${courseId} and courses.deletedAt is null`)
            .leftJoin(courses, eq(course_Feature.courseId, courses.id))
            .limit(limit)
            .offset(offset);
        return pageFeature;
    }
    async create(CreateFeatureDto) {
        await db.insert(course_Feature).values(CreateFeatureDto);
        return 'Feature created successfully!';
    }
    async update(UpdateFeatureDto) {
        try {
            for (const dto of UpdateFeatureDto) {
                if (!dto.id) {
                    throw new Error('Invalid data. "id" is required for update.');
                }
                await db
                    .update(course_Feature)
                    .set(dto)
                    .where(eq(course_Feature.id, dto.id));
            }
            return 'Feature updated successfully!';
        }
        catch (error) {
            console.error('Error in FeatureService.update:', error);
            throw new Error('Failed to update Learning Material');
        }
    }
    async delete(id) {
        await db.delete(course_Feature).where(eq(course_Feature.id, id));
        return 'Feature deleted successfully!';
    }
}
//# sourceMappingURL=feature.service.js.map