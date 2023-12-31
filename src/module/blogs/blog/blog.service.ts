import { db } from '../../../db/database';
import { categories, blog_Seo, blogs } from '../../../db/schema';
import { InferModel, desc, eq, isNull, sql } from 'drizzle-orm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import slugify from 'slugify';

export class BlogsService {
  async getAll(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageBlog = await db
      .select({
        title: blogs.title,
        slug: blogs.slug,
        category: categories.name,
        date: blogs.createdAt,
      })
      .from(blogs)
      .where(sql`status = 'published' AND deletedAt IS NULL`)
      .orderBy(desc(blogs.id))
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .limit(limit)
      .offset(offset);

    return pageBlog;
  }

  async create(createBlogDto: CreateBlogDto) {
    const existingBlog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.title, createBlogDto.title));

    if (existingBlog.length > 0) {
      throw new Error('Blog already exists');
    }

    const newBlog = {
      ...createBlogDto,
    };

    newBlog.slug = slugify(newBlog.title, {
      replacement: '-',
      lower: true,
    });

    const [createdBlogId] = await db.insert(blogs).values(newBlog);

    return {
      blogId: createdBlogId.insertId,
      message: 'Blog created successfully!',
    };
  }

  async show(slug: string) {
    type Blog = InferModel<typeof blogs>;
    type Seo = InferModel<typeof blog_Seo>;

    const rows = await db
      .select({
        blogs: {
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          description: blogs.description,
          category: categories.name,
        },
        blog_Seo: {
          name: blog_Seo.name,
          property: blog_Seo.property,
          content: blog_Seo.content,
        },
      })
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .where(eq(blogs.status, 'published'))
      .where(isNull(blogs.deletedAt))
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .leftJoin(blog_Seo, eq(blogs.id, blog_Seo.blogId));

    const result: Record<
      number,
      {
        blog: Blog;
        seo: Seo[];
      }
    > = rows.reduce((acc: any, row) => {
      const blog = row.blogs;
      const seo = row.blog_Seo;

      if (!acc[blog.id]) {
        acc[blog.id] = {
          blog,
          seo: [],
        };
      }

      if (seo) {
        const isSeoExist = acc[blog.id].seo.find(
          (item: any) => item.property === seo.property,
        );
        if (!isSeoExist) {
          acc[blog.id].seo.push(seo);
        }
      }

      return acc;
    }, {});

    function filterNullValues(obj: any) {
      return Object.keys(obj).reduce((acc: any, key) => {
        if (obj[key] !== null) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    }
    Object.values(result).forEach((blogData) => {
      blogData.seo = blogData.seo.map(filterNullValues);
    });

    return result[Number(Object.keys(result)[0])];
  }

  async update(slug: string, updateBlogDto: UpdateBlogDto) {
    const blog = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .where(isNull(blogs.deletedAt));

    if (blog.length === 0) {
      throw new Error('Blog not found');
    }
    if (updateBlogDto.title) {
      const newSlug = slugify(updateBlogDto.title, {
        replacement: '-',
        lower: true,
      });

      if (newSlug !== slug) {
        await db
          .update(blogs)
          .set({ ...updateBlogDto, slug: newSlug, updatedAt: new Date() })
          .where(eq(blogs.slug, slug));

        return 'Blog updated successfully!';
      }
    }
    await db.update(blogs).set(updateBlogDto).where(eq(blogs.slug, slug));

    return 'Blog updated successfully!';
  }

  async delete(slug: string) {
    const blog = await db.select().from(blogs).where(eq(blogs.slug, slug));

    if (blog.length === 0) {
      throw new Error('Blog not found');
    }

    await db
      .update(blogs)
      .set({ deletedAt: new Date() })
      .where(eq(blogs.slug, slug));
  }

  async blogsDraft(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageBlog = await db
      .select({
        title: blogs.title,
        slug: blogs.slug,
        category: categories.name,
        date: blogs.createdAt,
      })
      .from(blogs)
      .where(isNull(blogs.deletedAt))
      .orderBy(desc(blogs.id))
      .limit(limit)
      .offset(offset)
      .leftJoin(categories, eq(blogs.categoryId, categories.id));

    return pageBlog;
  }
}
