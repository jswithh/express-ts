import { db } from '../../../db/database';
import { course_Feature } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

export class FeatureService {
  async getAll(courseId: number, page: number, limit: number) {
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
      .limit(limit)
      .offset(offset);

    return pageFeature;
  }
  async create(CreateFeatureDto: CreateFeatureDto) {
    await db.insert(course_Feature).values(CreateFeatureDto);
    return 'Feature created successfully!';
  }

  async update(UpdateFeatureDto: UpdateFeatureDto[]) {
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
    } catch (error) {
      console.error('Error in FeatureService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db.delete(course_Feature).where(eq(course_Feature.id, id));

    return 'Feature deleted successfully!';
  }
}
