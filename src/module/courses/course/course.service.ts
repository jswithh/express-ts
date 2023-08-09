import { db } from '../../../db/database';
import {
  categories,
  course_Benefit,
  course_Faq,
  course_Feature,
  course_Seo,
  course_Testimonial,
  course_learningMaterial,
  courses,
} from '../../../db/schema';
import { InferModel, desc, eq, sql } from 'drizzle-orm';
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
      .where(sql`courses.status = 'published' and courses.deletedAt is null`)
      .orderBy(desc(courses.id))
      .limit(limit)
      .offset(offset);

    if (pageCourse.length === 0) {
      return 'No course found';
    }

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
    type Testimonial = InferModel<typeof course_Testimonial>;
    type Seo = InferModel<typeof course_Seo>;
    type Benefit = InferModel<typeof course_Benefit>;

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
        course_Benefit: {
          benefit: course_Benefit.benefit,
        },
        course_Faq: {
          question: course_Faq.question,
          answer: course_Faq.answer,
        },
        course_Testimonial: {
          star: course_Testimonial.star,
          name: course_Testimonial.name,
          profileImg: course_Testimonial.profileImg,
          review: course_Testimonial.review,
        },
        course_Seo: {
          name: course_Seo.name,
          property: course_Seo.property,
          content: course_Seo.content,
        },
      })
      .from(courses)
      .where(
        sql`courses.slug = ${slug} and courses.deletedAt is null and courses.status = 'published'`,
      )
      .leftJoin(categories, eq(courses.categoryId, categories.id))
      .leftJoin(
        course_learningMaterial,
        eq(courses.id, course_learningMaterial.courseId),
      )
      .leftJoin(course_Feature, eq(courses.id, course_Feature.courseId))
      .leftJoin(course_Benefit, eq(courses.id, course_Benefit.courseId))
      .leftJoin(course_Faq, eq(courses.id, course_Faq.courseId))
      .leftJoin(course_Testimonial, eq(courses.id, course_Testimonial.courseId))
      .leftJoin(course_Seo, eq(courses.id, course_Seo.courseId));

    const result: Record<
      number,
      {
        course: Course;
        learningMaterials: LearningMaterial[];
        features: Feature[];
        benefits: Benefit[];
        faqs: Faq[];
        testimonials: Testimonial[];
        seo: Seo[];
      }
    > = rows.reduce((acc: any, row) => {
      const course = row.courses;
      const learningMaterial = row.course_learningMaterial;
      const feature = row.course_Feature;
      const benefit = row.course_Benefit;
      const faq = row.course_Faq;
      const testimonial = row.course_Testimonial;
      const seo = row.course_Seo;

      if (!acc[course.id]) {
        acc[course.id] = {
          course,
          learningMaterials: [],
          features: [],
          benefits: [],
          faqs: [],
          testimonials: [],
          seo: [],
        };
      }

      if (learningMaterial) {
        if (
          !acc[course.id].learningMaterials.some(
            (lm: any) => lm.kkni === learningMaterial.kkni,
          )
        )
          acc[course.id].learningMaterials.push(learningMaterial);
      }

      if (feature) {
        if (
          !acc[course.id].features.some(
            (f: any) => f.feature === feature.feature,
          )
        )
          acc[course.id].features.push(feature);
      }

      if (benefit) {
        if (
          !acc[course.id].benefits.some(
            (b: any) => b.benefit === benefit.benefit,
          )
        )
          acc[course.id].benefits.push(benefit);
      }

      if (faq) {
        if (!acc[course.id].faqs.some((f: any) => f.question === faq.question))
          acc[course.id].faqs.push(faq);
      }

      if (testimonial) {
        if (
          !acc[course.id].testimonials.some(
            (t: any) => t.name === testimonial.name,
          )
        )
          acc[course.id].testimonials.push(testimonial);
      }

      if (seo) {
        if (!acc[course.id].seo.some((s: any) => s.property === seo.property))
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
      .where(sql`courses.slug = ${slug} and courses.deletedAt is null`);

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
    await db
      .update(courses)
      .set({ deletedAt: new Date() })
      .where(eq(courses.slug, slug));

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
      .orderBy(desc(courses.id))
      .limit(limit)
      .offset(offset);

    return pageCourse;
  }
}
