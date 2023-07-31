import { db } from '../../db/database';
import { categories } from '../../db/schema';
import { desc, eq } from 'drizzle-orm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

export class CategoriesService {
  async getAll(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageCategory = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .orderBy(desc(categories.id))
      .limit(limit)
      .offset(offset);

    return pageCategory;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.name, createCategoryDto.name));

    if (existingCategory.length > 0) {
      throw new Error('Category already exists');
    }

    const newCategory = {
      ...createCategoryDto,
    };

    newCategory.slug = slugify(newCategory.name, {
      replacement: '-',
      lower: true,
    });

    await db.insert(categories).values(newCategory);
    return 'Category created successfully!';
  }

  async show(slug: string) {
    const category = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .where(eq(categories.slug, slug));

    return category[0];
  }

  async update(slug: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));

    if (category.length === 0) {
      throw new Error('Category not found');
    }
    if (updateCategoryDto.name) {
      const newSlug = slugify(updateCategoryDto.name, {
        replacement: '-',
        lower: true,
      });

      if (newSlug !== slug) {
        await db
          .update(categories)
          .set({ ...updateCategoryDto, slug: newSlug })
          .where(eq(categories.slug, slug));

        return 'Category updated successfully!';
      }
    }
    await db
      .update(categories)
      .set(updateCategoryDto)
      .where(eq(categories.slug, slug));

    return 'Category updated successfully!';
  }

  async delete(slug: string) {
    await db.delete(categories).where(eq(categories.slug, slug));

    return 'Category deleted successfully!';
  }
}
