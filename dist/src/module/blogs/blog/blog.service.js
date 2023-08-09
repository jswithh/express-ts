import { db } from '../../../db/database';
import { categories, blog_Seo, blogs } from '../../../db/schema';
import { desc, eq, isNull } from 'drizzle-orm';
import slugify from 'slugify';
export class BlogsService {
    async getAll(page, limit) {
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
            .where(eq(blogs.status, 'published'))
            .where(isNull(blogs.deletedAt))
            .orderBy(desc(blogs.id))
            .leftJoin(categories, eq(blogs.categoryId, categories.id))
            .limit(limit)
            .offset(offset);
        return pageBlog;
    }
    async create(createBlogDto) {
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
    async show(slug) {
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
        const result = rows.reduce((acc, row) => {
            const blog = row.blogs;
            const seo = row.blog_Seo;
            if (!acc[blog.id]) {
                acc[blog.id] = {
                    blog,
                    seo: [],
                };
            }
            if (seo) {
                const isSeoExist = acc[blog.id].seo.find((item) => item.property === seo.property);
                if (!isSeoExist) {
                    acc[blog.id].seo.push(seo);
                }
            }
            return acc;
        }, {});
        function filterNullValues(obj) {
            return Object.keys(obj).reduce((acc, key) => {
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
    async update(slug, updateBlogDto) {
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
    async delete(slug) {
        const blog = await db.select().from(blogs).where(eq(blogs.slug, slug));
        if (blog.length === 0) {
            throw new Error('Blog not found');
        }
        await db
            .update(blogs)
            .set({ deletedAt: new Date() })
            .where(eq(blogs.slug, slug));
    }
    async blogsDraft(page, limit) {
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
            .where(eq(blogs.status, 'draft'))
            .where(isNull(blogs.deletedAt))
            .orderBy(desc(blogs.id))
            .limit(limit)
            .offset(offset)
            .leftJoin(categories, eq(blogs.categoryId, categories.id));
        return pageBlog;
    }
}
//# sourceMappingURL=blog.service.js.map