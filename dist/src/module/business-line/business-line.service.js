import { db } from '../../db/database';
import { businessLine } from '../../db/schema';
import { desc, eq, sql } from 'drizzle-orm';
export class businessLineService {
    async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        try {
            const offset = (page - 1) * limit;
            const pageBussinesLine = await db
                .select({
                id: businessLine.id,
                name: businessLine.name,
                slug: businessLine.slug,
                images: businessLine.images,
            })
                .from(businessLine)
                .orderBy(desc(businessLine.id))
                .limit(limit)
                .offset(offset);
            if (pageBussinesLine.length === 0) {
                return 'Page not found';
            }
            return pageBussinesLine;
        }
        catch (error) {
            throw new Error('Page not found');
        }
    }
    async create(createbusinessLineDto) {
        const existingPage = await db
            .select()
            .from(businessLine)
            .where(eq(businessLine.name, createbusinessLineDto.name));
        if (existingPage.length > 0) {
            throw new Error('Page already exists');
        }
        await db.insert(businessLine).values(createbusinessLineDto);
        return 'Page created successfully!';
    }
    async show(url) {
        try {
            const page = await db
                .select({
                name: businessLine.name,
                slug: businessLine.slug,
                images: businessLine.images,
                content: businessLine.content,
                createdAt: businessLine.createdAt,
            })
                .from(businessLine)
                .where(sql `businessLine.url = ${url} and businessLine.status is published`);
            return page[0];
        }
        catch (error) {
            return 'Page not found';
        }
    }
    async update(id, UpdatebusinessLineDto) {
        try {
            const page = await db
                .select()
                .from(businessLine)
                .where(eq(businessLine.id, id));
            if (page.length === 0) {
                throw new Error('Page not found');
            }
            await db
                .update(businessLine)
                .set(UpdatebusinessLineDto)
                .where(eq(businessLine.id, id));
            return 'Page updated successfully!';
        }
        catch (error) {
            throw new Error('Page not found');
        }
    }
    async delete(id) {
        try {
            await db.delete(businessLine).where(eq(businessLine.id, id));
            return 'Page deleted successfully!';
        }
        catch (error) {
            throw new Error('Page not found');
        }
    }
}
//# sourceMappingURL=business-line.service.js.map