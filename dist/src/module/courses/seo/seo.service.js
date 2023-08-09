import { db } from '../../../db/database';
import { course_Seo, courses } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
export class SeoService {
    async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        const offset = (page - 1) * limit;
        const pageSeo = await db
            .select({
            id: course_Seo.id,
            name: course_Seo.name,
            property: course_Seo.property,
            content: course_Seo.content,
        })
            .from(course_Seo)
            .where(sql `course_Seo.courseId = ${courseId} and courses.deletedAt is null`)
            .leftJoin(courses, eq(course_Seo.courseId, courses.id))
            .limit(limit)
            .offset(offset);
        function removeNullKeys(obj) {
            for (let prop in obj) {
                if (obj[prop] === null) {
                    delete obj[prop];
                }
                else if (typeof obj[prop] === 'object') {
                    removeNullKeys(obj[prop]);
                }
            }
            return obj;
        }
        return pageSeo.map((seo) => removeNullKeys(seo));
    }
    async create(CreateSeoDto) {
        await db.insert(course_Seo).values(CreateSeoDto);
        return 'Seo created successfully!';
    }
    async update(UpdateSeoDto) {
        try {
            for (const dto of UpdateSeoDto) {
                if (!dto.id) {
                    throw new Error('Invalid data. "id" is required for update.');
                }
                await db.update(course_Seo).set(dto).where(eq(course_Seo.id, dto.id));
            }
            return 'Seo updated successfully!';
        }
        catch (error) {
            console.error('Error in SeoService.update:', error);
            throw new Error('Failed to update Learning Material');
        }
    }
    async delete(id) {
        await db.delete(course_Seo).where(eq(course_Seo.id, id));
        return 'Seo deleted successfully!';
    }
}
//# sourceMappingURL=seo.service.js.map