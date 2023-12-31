import { relations } from 'drizzle-orm';
import {
  mysqlEnum,
  mysqlTable,
  int,
  uniqueIndex,
  varchar,
  timestamp,
  text,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (users) => ({
    emailIndex: uniqueIndex('email_idx').on(users.email),
  }),
);

export const categories = mysqlTable(
  'categories',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deletedAt'),
  },
  (categories) => ({
    slugIndex: uniqueIndex('slug_idx').on(categories.slug),
  }),
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses),
  blogs: many(blogs),
}));

export const courses = mysqlTable(
  'courses',
  {
    id: int('id').primaryKey().autoincrement(),
    categoryId: int('categoryId').references(() => categories.id),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }).notNull(),
    description: text('description').notNull(),
    competency_unit: varchar('competency_unit', { length: 255 }).notNull(),
    price: int('price').notNull(),
    discount: int('discount'),
    discountPrice: int('discountPrice'),
    thumbnail: varchar('thumbnail', { length: 255 }).notNull(),
    heroImg: varchar('heroImg', { length: 255 }).notNull(),
    demoVideo: varchar('demoVideo', { length: 255 }),
    status: mysqlEnum('status', ['draft', 'published'])
      .notNull()
      .default('draft'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deletedAt'),
  },
  (courses) => ({
    slugIndex: uniqueIndex('slug_idx').on(courses.slug),
  }),
);

export const coursesRelationsOne = relations(courses, ({ one }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
}));

export const courseRelationsMany = relations(courses, ({ many }) => ({
  course_learningMaterial: many(course_learningMaterial),
  course_Feature: many(course_Feature),
  course_Faq: many(course_Faq),
  course_Testimonial: many(course_Testimonial),
  course_Seo: many(course_Seo),
  course_Benefit: many(course_Benefit),
}));

export const course_learningMaterial = mysqlTable('course_learningMaterial', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  kkni: varchar('kkni', { length: 255 }).notNull(),
  kkni_title: varchar('kkni_title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_learningMaterialRelationsOne = relations(
  course_learningMaterial,
  ({ one }) => ({
    course: one(courses, {
      fields: [course_learningMaterial.courseId],
      references: [courses.id],
    }),
  }),
);

export const course_Feature = mysqlTable('course_Feature', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  feature: varchar('feature', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_FeatureRelationsOne = relations(
  course_Feature,
  ({ one }) => ({
    course: one(courses, {
      fields: [course_Feature.courseId],
      references: [courses.id],
    }),
  }),
);

export const course_Faq = mysqlTable('course_Faq', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_FaqRelationsOne = relations(course_Faq, ({ one }) => ({
  course: one(courses, {
    fields: [course_Faq.courseId],
    references: [courses.id],
  }),
}));

export const course_Testimonial = mysqlTable('course_Testimonial', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  star: int('star'),
  name: varchar('name', { length: 255 }).notNull(),
  profileImg: varchar('profileImg', { length: 255 }).notNull(),
  review: text('review').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_TestimonialRelationsOne = relations(
  course_Testimonial,
  ({ one }) => ({
    course: one(courses, {
      fields: [course_Testimonial.courseId],
      references: [courses.id],
    }),
  }),
);

export const course_Seo = mysqlTable('course_Seo', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  name: varchar('name', { length: 255 }),
  property: varchar('property', { length: 255 }),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_SeoRelationsOne = relations(course_Seo, ({ one }) => ({
  course: one(courses, {
    fields: [course_Seo.courseId],
    references: [courses.id],
  }),
}));

export const course_Benefit = mysqlTable('course_Benefit', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('courseId').references(() => courses.id),
  benefit: text('benefit').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const course_BenefitRelationsOne = relations(
  course_Benefit,
  ({ one }) => ({
    course: one(courses, {
      fields: [course_Benefit.courseId],
      references: [courses.id],
    }),
  }),
);

export const blogs = mysqlTable(
  'blogs',
  {
    id: int('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 255 }).notNull(),
    categoryId: int('categoryId').references(() => categories.id),
    slug: varchar('slug', { length: 255 }).notNull(),
    description: text('description').notNull(),
    status: mysqlEnum('status', ['draft', 'published']),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    deletedAt: timestamp('deletedAt'),
  },

  (blogs) => ({
    slugIndex: uniqueIndex('slug_idx').on(blogs.slug),
  }),
);

export const blogsRelationsOne = relations(blogs, ({ one }) => ({
  category: one(categories, {
    fields: [blogs.categoryId],
    references: [categories.id],
  }),
}));

export const blogRelationsMany = relations(blogs, ({ many }) => ({
  blog_Seo: many(blog_Seo),
}));

export const blog_Seo = mysqlTable('blog_Seo', {
  id: int('id').primaryKey().autoincrement(),
  blogId: int('blogId').references(() => blogs.id),
  name: varchar('name', { length: 255 }),
  property: varchar('property', { length: 255 }),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const pages = mysqlTable('pages', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  seoDescription: text('seoDescription').notNull(),
  content: text('content').notNull(),
  status: mysqlEnum('status', ['draft', 'published']),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const businessLine = mysqlTable('businessLine', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  images: varchar('images', { length: 255 }).notNull(),
  content: text('content').notNull(),
  status: mysqlEnum('status', ['draft', 'published']),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const jobs = mysqlTable('jobs', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  images: varchar('images', { length: 255 }).notNull(),
  status: mysqlEnum('status', ['draft', 'published']),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  deletedAt: timestamp('deletedAt'),
});

export const jobsRelationsMany = relations(jobs, ({ many }) => ({
  jobs_Qualification: many(jobs_Qualification),
  jobs_Responsibility: many(jobs_Responsibility),
  jobs_Document: many(jobs_Document),
}));

export const jobs_Qualification = mysqlTable('jobs_Qualification', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('jobId').references(() => jobs.id),
  qualification: text('qualification').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const jobs_Responsibility = mysqlTable('jobs_Responsibility', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('jobId').references(() => jobs.id),
  responsibility: text('responsibility').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const jobs_Document = mysqlTable('jobs_Document', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('jobId').references(() => jobs.id),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  document: varchar('document', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});
