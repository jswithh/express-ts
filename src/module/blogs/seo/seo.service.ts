import { db } from '../../../db/database';
import { blog_Seo, blogs } from '../../../db/schema';
import { eq, isNull } from 'drizzle-orm';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';

export class SeoService {
  async getAll(blogId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }
    const offset = (page - 1) * limit;
    const pageSeo = await db
      .select({
        id: blog_Seo.id,
        name: blog_Seo.name,
        property: blog_Seo.property,
        content: blog_Seo.content,
      })
      .from(blog_Seo)
      .where(eq(blog_Seo.blogId, blogId))
      .where(isNull(blogs.deletedAt))
      .leftJoin(blogs, eq(blog_Seo.blogId, blogs.id))
      .limit(limit)
      .offset(offset);

    function removeNullKeys(obj: any) {
      for (let prop in obj) {
        if (obj[prop] === null) {
          delete obj[prop];
        } else if (typeof obj[prop] === 'object') {
          removeNullKeys(obj[prop]);
        }
      }
      return obj;
    }

    return pageSeo.map((seo) => removeNullKeys(seo));
  }

  async create(CreateSeoDto: CreateSeoDto) {
    await db.insert(blog_Seo).values(CreateSeoDto);
    return 'Seo created successfully!';
  }

  async update(UpdateSeoDto: UpdateSeoDto[]) {
    try {
      for (const dto of UpdateSeoDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db.update(blog_Seo).set(dto).where(eq(blog_Seo.id, dto.id));
      }

      return 'Seo updated successfully!';
    } catch (error) {
      console.error('Error in SeoService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(blog_Seo).where(eq(blog_Seo.id, id));

    return 'Seo deleted successfully!';
  }
}
