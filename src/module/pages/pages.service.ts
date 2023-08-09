import { db } from '../../db/database';
import { pages } from '../../db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

export class PagesService {
  async getAll(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    try {
      const offset = (page - 1) * limit;
      const pagePage = await db
        .select({
          id: pages.id,
          name: pages.name,
          url: pages.url,
          status: pages.status,
          createdAt: pages.createdAt,
        })
        .from(pages)
        .orderBy(desc(pages.id))
        .limit(limit)
        .offset(offset);

      if (pagePage.length === 0) {
        return 'Page not found';
      }

      return pagePage;
    } catch (error) {
      throw new Error('Page not found');
    }
  }

  async create(createPageDto: CreatePageDto) {
    const existingPage = await db
      .select()
      .from(pages)
      .where(eq(pages.name, createPageDto.name));

    if (existingPage.length > 0) {
      throw new Error('Page already exists');
    }

    await db.insert(pages).values(createPageDto);
    return 'Page created successfully!';
  }

  async show(url: string) {
    try {
      const page = await db
        .select({
          name: pages.name,
          title: pages.title,
          url: pages.url,
          seoDescription: pages.seoDescription,
          content: pages.content,
          status: pages.status,
        })
        .from(pages)
        .where(sql`pages.url = ${url} and pages.status is published`);

      return page[0];
    } catch (error) {
      return 'Page not found';
    }
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    try {
      const page = await db.select().from(pages).where(eq(pages.id, id));

      if (page.length === 0) {
        throw new Error('Page not found');
      }

      await db.update(pages).set(updatePageDto).where(eq(pages.id, id));

      return 'Page updated successfully!';
    } catch (error) {
      throw new Error('Page not found');
    }
  }

  async delete(id: number) {
    try {
      await db.delete(pages).where(eq(pages.id, id));
      return 'Page deleted successfully!';
    } catch (error) {
      throw new Error('Page not found');
    }
  }
}
