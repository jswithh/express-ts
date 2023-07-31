import { db } from '../../../db/database';
import {
  categories,
  course_Faq,
  course_Feature,
  course_Seo,
  course_learningMaterial,
  courses,
} from '../../../db/schema';
import { InferModel, desc, eq } from 'drizzle-orm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import slugify from 'slugify';

export class CoursesService {
  async getAll(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageCourse = await db
      .select({
        title: courses.title,
        slug: courses.slug,
        thumbnail: courses.thumbnail,
        price: courses.price,
        discount: courses.discount,
        discountPrice: courses.discountPrice,
      })
      .from(courses)
      .where(eq(courses.status, 'published'))
      .orderBy(desc(courses.id))
      .limit(limit)
      .offset(offset);

    return pageCourse;
  }

  async create(createCourseDto: CreateCourseDto) {
    const existingCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.title, createCourseDto.title));

    if (existingCourse.length > 0) {
      throw new Error('Course already exists');
    }

    const newCourse = {
      ...createCourseDto,
    };

    newCourse.slug = slugify(newCourse.title, {
      replacement: '-',
      lower: true,
    });

    if (newCourse.discount) {
      newCourse.discountPrice =
        newCourse.price - (newCourse.price * newCourse.discount) / 100;
    }

    const [createdCourseId] = await db.insert(courses).values(newCourse);

    return {
      courseId: createdCourseId.insertId,
      message: 'Course created successfully!',
    };
  }

  async show(slug: string) {
    type Course = InferModel<typeof courses>;
    type LearningMaterial = InferModel<typeof course_learningMaterial>;
    type Feature = InferModel<typeof course_Feature>;
    type Faq = InferModel<typeof course_Faq>;
    type Seo = InferModel<typeof course_Seo>;

    const rows = await db
      .select({
        courses: {
          id: courses.id,
          title: courses.title,
          slug: courses.slug,
          subtitle: courses.subtitle,
          description: courses.description,
          competency_unit: courses.competency_unit,
          price: courses.price,
          discount: courses.discount,
          priceDiscount: courses.discountPrice,
          heroImg: courses.heroImg,
          demoVideo: courses.demoVideo,
          category: categories.name,
        },
        course_learningMaterial: {
          kkni: course_learningMaterial.kkni,
          kkni_title: course_learningMaterial.kkni,
          desription: course_learningMaterial.description,
        },
        course_Feature: {
          feature: course_Feature.feature,
        },
        course_Faq: {
          question: course_Faq.question,
          answer: course_Faq.answer,
        },
        course_Seo: {
          name: course_Seo.name,
          property: course_Seo.property,
          content: course_Seo.content,
        },
      })
      .from(courses)
      .where(eq(courses.slug, slug))
      .leftJoin(categories, eq(courses.categoryId, categories.id))
      .leftJoin(
        course_learningMaterial,
        eq(courses.id, course_learningMaterial.courseId),
      )
      .leftJoin(course_Feature, eq(courses.id, course_Feature.courseId))
      .leftJoin(course_Faq, eq(courses.id, course_Faq.courseId))
      .leftJoin(course_Seo, eq(courses.id, course_Seo.courseId));

    const result: Record<
      number,
      {
        course: Course;
        learningMaterials: LearningMaterial[];
        features: Feature[];
        faqs: Faq[];
        seo: Seo[];
      }
    > = rows.reduce((acc: any, row) => {
      const course = row.courses;
      const learningMaterial = row.course_learningMaterial;
      const feature = row.course_Feature;
      const faq = row.course_Faq;
      const seo = row.course_Seo;

      if (!acc[course.id]) {
        acc[course.id] = {
          course,
          learningMaterials: [],
          features: [],
          faqs: [],
          seo: [],
        };
      }

      if (learningMaterial) {
        acc[course.id].learningMaterials.push(learningMaterial);
      }

      if (feature) {
        acc[course.id].features.push(feature);
      }

      if (faq) {
        acc[course.id].faqs.push(faq);
      }

      if (seo) {
        acc[course.id].seo.push(seo);
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
    Object.values(result).forEach((courseData) => {
      courseData.seo = courseData.seo.map(filterNullValues);
    });

    return result[Number(Object.keys(result)[0])];
  }

  async update(slug: string, updateCourseDto: UpdateCourseDto) {
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug));

    if (course.length === 0) {
      throw new Error('Course not found');
    }
    if (updateCourseDto.title) {
      const newSlug = slugify(updateCourseDto.title, {
        replacement: '-',
        lower: true,
      });

      if (newSlug !== slug) {
        await db
          .update(courses)
          .set({ ...updateCourseDto, slug: newSlug })
          .where(eq(courses.slug, slug));

        return 'Course updated successfully!';
      }
    }
    await db.update(courses).set(updateCourseDto).where(eq(courses.slug, slug));

    return 'Course updated successfully!';
  }

  async delete(slug: string) {
    await db.delete(courses).where(eq(courses.slug, slug));

    return 'Course deleted successfully!';
  }

  async coursesDraft(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Invalid page or limit value');
    }

    const offset = (page - 1) * limit;
    const pageCourse = await db
      .select({
        title: courses.title,
        slug: courses.slug,
        thumbnail: courses.thumbnail,
        price: courses.price,
        discount: courses.discount,
        discountPrice: courses.discountPrice,
      })
      .from(courses)
      .where(eq(courses.status, 'draft'))
      .orderBy(desc(courses.id))
      .limit(limit)
      .offset(offset);

    return pageCourse;
  }
}
