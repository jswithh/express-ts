import { db } from '../../../db/database';
import { course_learningMaterial } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { CreatelearningMaterialDto } from './dto/create-learning-material.dto';
import { UpdatelearningMaterialDto } from './dto/update-learning-material.dto';

export class LearningMaterialService {
  async getAll(courseId: number, page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageLearningMaterial = await db
      .select({
        id: course_learningMaterial.id,
        kkni: course_learningMaterial.kkni,
        kkni_title: course_learningMaterial.kkni_title,
        description: course_learningMaterial.description,
      })
      .from(course_learningMaterial)
      .limit(limit)
      .offset(offset);

    return pageLearningMaterial;
  }
  async create(CreatelearningMaterialDto: CreatelearningMaterialDto) {
    const existingLearningMaterial = await db
      .select({
        kkni: course_learningMaterial.kkni,
      })
      .from(course_learningMaterial)
      .where(eq(course_learningMaterial.kkni, CreatelearningMaterialDto.kkni));

    if (existingLearningMaterial.length > 0) {
      throw new Error('Learning Material already exists');
    }
    await db.insert(course_learningMaterial).values(CreatelearningMaterialDto);
    return 'LearningMaterial created successfully!';
  }

  async update(UpdatelearningMaterialDto: UpdatelearningMaterialDto[]) {
    try {
      for (const dto of UpdatelearningMaterialDto) {
        if (!dto.id) {
          throw new Error('Invalid data. "id" is required for update.');
        }

        await db
          .update(course_learningMaterial)
          .set(dto)
          .where(eq(course_learningMaterial.id, dto.id));
      }

      return 'LearningMaterial updated successfully!';
    } catch (error) {
      console.error('Error in LearningMaterialService.update:', error);
      throw new Error('Failed to update Learning Material');
    }
  }

  async delete(id: number) {
    await db
      .delete(course_learningMaterial)
      .where(eq(course_learningMaterial.id, id));

    return 'LearningMaterial deleted successfully!';
  }
}