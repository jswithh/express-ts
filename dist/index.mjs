var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc6) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc6 = __getOwnPropDesc(from, key)) || desc6.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/db/database.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
var db;
var init_database = __esm({
  "src/db/database.ts"() {
    "use strict";
    db = drizzle(
      mysql.createPool({
        host: process.env["DATABASE_HOST"],
        user: process.env["DATABASE_USERNAME"],
        database: process.env["DATABASE_NAME"],
        password: process.env["DATABASE_PASSWORD"]
      })
    );
  }
});

// src/db/schema.ts
import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  int,
  uniqueIndex,
  varchar,
  timestamp,
  text
} from "drizzle-orm/mysql-core";
var users, categories, categoriesRelations, courses, coursesRelationsOne, courseRelationsMany, course_learningMaterial, course_learningMaterialRelationsOne, course_Feature, course_FeatureRelationsOne, course_Faq, course_FaqRelationsOne, course_Testimonial, course_TestimonialRelationsOne, course_Seo, course_SeoRelationsOne, course_Benefit, course_BenefitRelationsOne, blogs, blogsRelationsOne, blogRelationsMany, blog_Seo, pages, businessLine, jobs, jobsRelationsMany, jobsQualification, jobsResponsibility, jobsDocument;
var init_schema = __esm({
  "src/db/schema.ts"() {
    "use strict";
    users = mysqlTable(
      "users",
      {
        id: int("id").primaryKey().autoincrement(),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull(),
        password: varchar("password", { length: 255 }).notNull(),
        role: mysqlEnum("role", ["admin", "user"]).notNull().default("user"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull()
      },
      (users2) => ({
        emailIndex: uniqueIndex("email_idx").on(users2.email)
      })
    );
    categories = mysqlTable(
      "categories",
      {
        id: int("id").primaryKey().autoincrement(),
        name: varchar("name", { length: 255 }).notNull(),
        slug: varchar("slug", { length: 255 }).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
        deletedAt: timestamp("deletedAt")
      },
      (categories2) => ({
        slugIndex: uniqueIndex("slug_idx").on(categories2.slug)
      })
    );
    categoriesRelations = relations(categories, ({ many }) => ({
      courses: many(courses),
      blogs: many(blogs)
    }));
    courses = mysqlTable(
      "courses",
      {
        id: int("id").primaryKey().autoincrement(),
        categoryId: int("categoryId").references(() => categories.id),
        title: varchar("title", { length: 255 }).notNull(),
        slug: varchar("slug", { length: 255 }).notNull(),
        subtitle: varchar("subtitle", { length: 255 }).notNull(),
        description: text("description").notNull(),
        competency_unit: varchar("competency_unit", { length: 255 }).notNull(),
        price: int("price").notNull(),
        discount: int("discount"),
        discountPrice: int("discountPrice"),
        thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
        heroImg: varchar("heroImg", { length: 255 }).notNull(),
        demoVideo: varchar("demoVideo", { length: 255 }),
        status: mysqlEnum("status", ["draft", "published"]).notNull().default("draft"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
        deletedAt: timestamp("deletedAt")
      },
      (courses2) => ({
        slugIndex: uniqueIndex("slug_idx").on(courses2.slug)
      })
    );
    coursesRelationsOne = relations(courses, ({ one }) => ({
      category: one(categories, {
        fields: [courses.categoryId],
        references: [categories.id]
      })
    }));
    courseRelationsMany = relations(courses, ({ many }) => ({
      course_learningMaterial: many(course_learningMaterial),
      course_Feature: many(course_Feature),
      course_Faq: many(course_Faq),
      course_Testimonial: many(course_Testimonial),
      course_Seo: many(course_Seo),
      course_Benefit: many(course_Benefit)
    }));
    course_learningMaterial = mysqlTable("course_learningMaterial", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      kkni: varchar("kkni", { length: 255 }).notNull(),
      kkni_title: varchar("kkni_title", { length: 255 }).notNull(),
      description: text("description").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_learningMaterialRelationsOne = relations(
      course_learningMaterial,
      ({ one }) => ({
        course: one(courses, {
          fields: [course_learningMaterial.courseId],
          references: [courses.id]
        })
      })
    );
    course_Feature = mysqlTable("course_Feature", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      feature: varchar("feature", { length: 255 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_FeatureRelationsOne = relations(
      course_Feature,
      ({ one }) => ({
        course: one(courses, {
          fields: [course_Feature.courseId],
          references: [courses.id]
        })
      })
    );
    course_Faq = mysqlTable("course_Faq", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      question: text("question").notNull(),
      answer: text("answer").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_FaqRelationsOne = relations(course_Faq, ({ one }) => ({
      course: one(courses, {
        fields: [course_Faq.courseId],
        references: [courses.id]
      })
    }));
    course_Testimonial = mysqlTable("course_Testimonial", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      star: int("star"),
      name: varchar("name", { length: 255 }).notNull(),
      profileImg: varchar("profileImg", { length: 255 }).notNull(),
      review: text("review").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_TestimonialRelationsOne = relations(
      course_Testimonial,
      ({ one }) => ({
        course: one(courses, {
          fields: [course_Testimonial.courseId],
          references: [courses.id]
        })
      })
    );
    course_Seo = mysqlTable("course_Seo", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      name: varchar("name", { length: 255 }),
      property: varchar("property", { length: 255 }),
      content: text("content").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_SeoRelationsOne = relations(course_Seo, ({ one }) => ({
      course: one(courses, {
        fields: [course_Seo.courseId],
        references: [courses.id]
      })
    }));
    course_Benefit = mysqlTable("course_Benefit", {
      id: int("id").primaryKey().autoincrement(),
      courseId: int("courseId").references(() => courses.id),
      benefit: text("benefit").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    course_BenefitRelationsOne = relations(
      course_Benefit,
      ({ one }) => ({
        course: one(courses, {
          fields: [course_Benefit.courseId],
          references: [courses.id]
        })
      })
    );
    blogs = mysqlTable(
      "blogs",
      {
        id: int("id").primaryKey().autoincrement(),
        title: varchar("title", { length: 255 }).notNull(),
        categoryId: int("categoryId").references(() => categories.id),
        slug: varchar("slug", { length: 255 }).notNull(),
        description: text("description").notNull(),
        status: mysqlEnum("status", ["draft", "published"]),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull(),
        deletedAt: timestamp("deletedAt")
      },
      (blogs2) => ({
        slugIndex: uniqueIndex("slug_idx").on(blogs2.slug)
      })
    );
    blogsRelationsOne = relations(blogs, ({ one }) => ({
      category: one(categories, {
        fields: [blogs.categoryId],
        references: [categories.id]
      })
    }));
    blogRelationsMany = relations(blogs, ({ many }) => ({
      blog_Seo: many(blog_Seo)
    }));
    blog_Seo = mysqlTable("blog_Seo", {
      id: int("id").primaryKey().autoincrement(),
      blogId: int("blogId").references(() => blogs.id),
      name: varchar("name", { length: 255 }),
      property: varchar("property", { length: 255 }),
      content: text("content").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    pages = mysqlTable("pages", {
      id: int("id").primaryKey().autoincrement(),
      name: varchar("name", { length: 255 }).notNull(),
      url: varchar("url", { length: 255 }).notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      seoDescription: text("seoDescription").notNull(),
      content: text("content").notNull(),
      status: mysqlEnum("status", ["draft", "published"]),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    businessLine = mysqlTable("businessLine", {
      id: int("id").primaryKey().autoincrement(),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull(),
      images: varchar("images", { length: 255 }).notNull(),
      content: text("content").notNull(),
      status: mysqlEnum("status", ["draft", "published"]),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    jobs = mysqlTable("jobs", {
      id: int("id").primaryKey().autoincrement(),
      title: varchar("title", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull(),
      images: varchar("image", { length: 255 }).notNull(),
      status: mysqlEnum("status", ["draft", "published"]),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull(),
      deletedAt: timestamp("deletedAt")
    });
    jobsRelationsMany = relations(jobs, ({ many }) => ({
      jobsQualification: many(jobsQualification),
      jobsResponsibility: many(jobsResponsibility),
      jobsDocument: many(jobsDocument)
    }));
    jobsQualification = mysqlTable("jobsQualification", {
      id: int("id").primaryKey().autoincrement(),
      jobId: int("jobId").references(() => jobs.id),
      qualification: text("qualification").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    jobsResponsibility = mysqlTable("jobsResponsibility", {
      id: int("id").primaryKey().autoincrement(),
      jobId: int("jobId").references(() => jobs.id),
      responsibility: text("responsibility").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
    jobsDocument = mysqlTable("jobsDocument", {
      id: int("id").primaryKey().autoincrement(),
      jobId: int("jobId").references(() => jobs.id),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 255 }).notNull(),
      document: varchar("document", { length: 255 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().notNull()
    });
  }
});

// src/module/users/users.service.ts
import bcrypt from "bcryptjs";
import { desc, eq } from "drizzle-orm";
var UsersService;
var init_users_service = __esm({
  "src/module/users/users.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    UsersService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageUser = await db.select({
          id: users.id,
          name: users.name,
          email: users.email
        }).from(users).orderBy(desc(users.id)).limit(limit).offset(offset);
        return pageUser;
      }
      async create(createUserDto) {
        const existingUser = await db.select().from(users).where(eq(users.email, createUserDto.email));
        if (existingUser.length > 0) {
          throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = {
          ...createUserDto,
          password: hashedPassword
        };
        await db.insert(users).values(newUser);
        return "User created successfully!";
      }
      async show(id) {
        const user = await db.select({
          id: users.id,
          name: users.name,
          email: users.email
        }).from(users).where(eq(users.id, id));
        return user[0];
      }
      async update(id, updateUserDto) {
        await db.update(users).set(updateUserDto).where(eq(users.id, id));
        return "User updated successfully!";
      }
      async delete(id) {
        await db.delete(users).where(eq(users.id, id));
        return "User deleted successfully!";
      }
    };
  }
});

// src/module/users/users.controller.ts
var UsersController;
var init_users_controller = __esm({
  "src/module/users/users.controller.ts"() {
    "use strict";
    init_users_service();
    UsersController = class {
      constructor(usersService = new UsersService()) {
        this.usersService = usersService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const users2 = await this.usersService.getAll(page, limit);
          return res.json(users2);
        } catch (error) {
          console.error("Error in UsersController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createUserDto = req.body;
        try {
          const result = await this.usersService.create(createUserDto);
          return res.status(201).json({ message: result });
        } catch (error) {
          console.error("Error in UsersController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const userId = Number(req.params.id);
          const user = await this.usersService.show(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.json(user);
        } catch (error) {
          console.error("Error in UsersController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const userId = Number(req.params.id);
        const updateUserDto = req.body;
        try {
          await this.usersService.update(userId, updateUserDto);
          return res.json({ message: "User updated successfully" });
        } catch (error) {
          console.error("Error in UsersController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const userId = Number(req.params.id);
        try {
          await this.usersService.delete(userId);
          return res.json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Error in UsersController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/config/jwt/index.ts
import * as dotenv from "dotenv";
var config2, jwt_default;
var init_jwt = __esm({
  "src/config/jwt/index.ts"() {
    "use strict";
    dotenv.config();
    config2 = {
      jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
      },
      port: process.env.PORT || 3e3,
      prefix: process.env.PREFIX || "api"
    };
    jwt_default = config2;
  }
});

// src/module/auth/middleware/checkAuth.ts
import jwt from "jsonwebtoken";
var checkAuth;
var init_checkAuth = __esm({
  "src/module/auth/middleware/checkAuth.ts"() {
    "use strict";
    init_jwt();
    checkAuth = (req, res, next) => {
      const token = req.headers["authorization"];
      let jwtPayload;
      try {
        jwtPayload = jwt.verify(token?.split(" ")[1], jwt_default.jwt.secret, {
          complete: true,
          audience: jwt_default.jwt.audience,
          issuer: jwt_default.jwt.issuer,
          algorithms: ["HS256"],
          clockTolerance: 0,
          ignoreExpiration: false,
          ignoreNotBefore: false
        });
        req.token = jwtPayload;
      } catch (error) {
        res.status(401).type("json").send('{"message": "Unauthorized"}');
        return;
      }
      next();
    };
  }
});

// src/module/auth/middleware/checkRole.ts
import { eq as eq2 } from "drizzle-orm";
var checkRole;
var init_checkRole = __esm({
  "src/module/auth/middleware/checkRole.ts"() {
    "use strict";
    init_database();
    init_schema();
    checkRole = (roles) => {
      return async (req, res, next) => {
        const userId = req.token.payload.id;
        const user = await db.select().from(users).where(eq2(users.id, userId));
        if (!user) {
          res.status(401).type("json").send('{"message": "Unauthorized"}');
          return;
        }
        if (roles.includes(user[0].role)) {
          next();
        } else {
          res.status(403).json({ message: "Not enough permissions" });
          return;
        }
      };
    };
  }
});

// src/module/users/users.route.ts
var users_route_exports = {};
__export(users_route_exports, {
  default: () => users_route_default
});
import { Router } from "express";
var router, userController, users_route_default;
var init_users_route = __esm({
  "src/module/users/users.route.ts"() {
    "use strict";
    init_users_controller();
    init_checkAuth();
    init_checkRole();
    router = Router();
    userController = new UsersController();
    router.get("/", [checkAuth, checkRole(["admin"])], userController.getAll).post("/create", [checkAuth, checkRole(["admin"])], userController.create).get("/:id", [checkAuth, checkRole(["admin"])], userController.show).patch(
      "/update/:id",
      [checkAuth, checkRole(["admin"])],
      userController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin"])],
      userController.delete
    );
    users_route_default = router;
  }
});

// src/module/auth/auth.service.ts
import bcrypt2 from "bcryptjs";
import jwt2 from "jsonwebtoken";
import { eq as eq3 } from "drizzle-orm";
var AuthService;
var init_auth_service = __esm({
  "src/module/auth/auth.service.ts"() {
    "use strict";
    init_jwt();
    init_schema();
    init_database();
    AuthService = class {
      async login(loginDto) {
        const user = await db.select().from(users).where(eq3(users.email, loginDto.email));
        if (user.length === 0) {
          throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt2.compare(
          loginDto.password,
          user[0].password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }
        const token = jwt2.sign(
          {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email
          },
          jwt_default.jwt.secret,
          {
            expiresIn: "24h",
            audience: jwt_default.jwt.audience,
            issuer: jwt_default.jwt.issuer
          }
        );
        return token;
      }
    };
  }
});

// src/module/auth/auth.controller.ts
var AuthController;
var init_auth_controller = __esm({
  "src/module/auth/auth.controller.ts"() {
    "use strict";
    init_auth_service();
    AuthController = class {
      constructor(authService = new AuthService()) {
        this.authService = authService;
      }
      login = async (req, res) => {
        const loginDto = req.body;
        try {
          const token = await this.authService.login(loginDto);
          return res.json({ message: "Login successful", token });
        } catch (error) {
          console.error("Error in AuthController.login:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/auth/auth.route.ts
var auth_route_exports = {};
__export(auth_route_exports, {
  default: () => auth_route_default
});
import { Router as Router2 } from "express";
var router2, authController, auth_route_default;
var init_auth_route = __esm({
  "src/module/auth/auth.route.ts"() {
    "use strict";
    init_auth_controller();
    router2 = Router2();
    authController = new AuthController();
    router2.post("/login", authController.login);
    auth_route_default = router2;
  }
});

// src/module/categories/categories.service.ts
import { desc as desc2, eq as eq4, isNull } from "drizzle-orm";
import slugify from "slugify";
var CategoriesService;
var init_categories_service = __esm({
  "src/module/categories/categories.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    CategoriesService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageCategory = await db.select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug
        }).from(categories).orderBy(desc2(categories.id)).where(isNull(categories.deletedAt)).limit(limit).offset(offset);
        return pageCategory;
      }
      async create(createCategoryDto) {
        const existingCategory = await db.select().from(categories).where(eq4(categories.name, createCategoryDto.name));
        if (existingCategory.length > 0) {
          throw new Error("Category already exists");
        }
        const newCategory = {
          ...createCategoryDto
        };
        newCategory.slug = slugify(newCategory.name, {
          replacement: "-",
          lower: true
        });
        await db.insert(categories).values(newCategory);
        return "Category created successfully!";
      }
      async show(slug) {
        const category = await db.select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug
        }).from(categories).where(eq4(categories.slug, slug)).where(isNull(categories.deletedAt));
        return category[0];
      }
      async update(slug, updateCategoryDto) {
        const category = await db.select().from(categories).where(eq4(categories.slug, slug)).where(isNull(categories.deletedAt));
        if (category.length === 0) {
          throw new Error("Category not found");
        }
        if (updateCategoryDto.name) {
          const newSlug = slugify(updateCategoryDto.name, {
            replacement: "-",
            lower: true
          });
          if (newSlug !== slug) {
            await db.update(categories).set({ ...updateCategoryDto, slug: newSlug }).where(eq4(categories.slug, slug));
            return "Category updated successfully!";
          }
        }
        await db.update(categories).set(updateCategoryDto).where(eq4(categories.slug, slug));
        return "Category updated successfully!";
      }
      async delete(slug) {
        await db.update(categories).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq4(categories.slug, slug));
        return "Category deleted successfully!";
      }
    };
  }
});

// src/module/categories/categories.controller.ts
var CategoriesController;
var init_categories_controller = __esm({
  "src/module/categories/categories.controller.ts"() {
    "use strict";
    init_categories_service();
    CategoriesController = class {
      constructor(categoriesService = new CategoriesService()) {
        this.categoriesService = categoriesService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const categories2 = await this.categoriesService.getAll(page, limit);
          return res.json(categories2);
        } catch (error) {
          console.error("Error in CategoriesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createCategoryDto = req.body;
        try {
          const result = await this.categoriesService.create(createCategoryDto);
          return res.status(201).json({ message: result });
        } catch (error) {
          console.error("Error in CategoriesController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const categorySlug = req.params.slug;
          const category = await this.categoriesService.show(categorySlug);
          if (!category) {
            return res.status(404).json({ error: "Category not found" });
          }
          return res.json(category);
        } catch (error) {
          console.error("Error in CategoriesController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const categorySlug = req.params.slug;
        const updateCategoryDto = req.body;
        try {
          await this.categoriesService.update(categorySlug, updateCategoryDto);
          return res.json({ message: "Category updated successfully" });
        } catch (error) {
          console.error("Error in CategoriesController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const categorySlug = req.params.slug;
        try {
          const category = await this.categoriesService.show(categorySlug);
          if (!category) {
            return res.status(404).json({ error: "Category not found" });
          }
          await this.categoriesService.delete(categorySlug);
          return res.json({ message: "Category deleted successfully" });
        } catch (error) {
          console.error("Error in CategoriesController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/categories/categories.route.ts
var categories_route_exports = {};
__export(categories_route_exports, {
  default: () => categories_route_default
});
import { Router as Router3 } from "express";
var router3, categoryController, categories_route_default;
var init_categories_route = __esm({
  "src/module/categories/categories.route.ts"() {
    "use strict";
    init_categories_controller();
    init_checkAuth();
    init_checkRole();
    router3 = Router3();
    categoryController = new CategoriesController();
    router3.get("/", categoryController.getAll).post(
      "/create",
      [checkAuth, checkRole(["admin", "user"])],
      categoryController.create
    ).get("/:slug", categoryController.show).patch(
      "/update/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      categoryController.update
    ).patch(
      "/delete/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      categoryController.delete
    );
    categories_route_default = router3;
  }
});

// src/module/courses/course/course.service.ts
import { desc as desc3, eq as eq5, sql } from "drizzle-orm";
import slugify2 from "slugify";
var CoursesService;
var init_course_service = __esm({
  "src/module/courses/course/course.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    CoursesService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageCourse = await db.select({
          title: courses.title,
          slug: courses.slug,
          thumbnail: courses.thumbnail,
          price: courses.price,
          discount: courses.discount,
          discountPrice: courses.discountPrice
        }).from(courses).where(sql`courses.status = 'published' and courses.deletedAt is null`).orderBy(desc3(courses.id)).limit(limit).offset(offset);
        if (pageCourse.length === 0) {
          return "No course found";
        }
        return pageCourse;
      }
      async create(createCourseDto) {
        const existingCourse = await db.select().from(courses).where(eq5(courses.title, createCourseDto.title));
        if (existingCourse.length > 0) {
          throw new Error("Course already exists");
        }
        const newCourse = {
          ...createCourseDto
        };
        newCourse.slug = slugify2(newCourse.title, {
          replacement: "-",
          lower: true
        });
        if (newCourse.discount) {
          newCourse.discountPrice = newCourse.price - newCourse.price * newCourse.discount / 100;
        }
        const [createdCourseId] = await db.insert(courses).values(newCourse);
        return {
          courseId: createdCourseId.insertId,
          message: "Course created successfully!"
        };
      }
      async show(slug) {
        const rows = await db.select({
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
            category: categories.name
          },
          course_learningMaterial: {
            kkni: course_learningMaterial.kkni,
            kkni_title: course_learningMaterial.kkni,
            desription: course_learningMaterial.description
          },
          course_Feature: {
            feature: course_Feature.feature
          },
          course_Benefit: {
            benefit: course_Benefit.benefit
          },
          course_Faq: {
            question: course_Faq.question,
            answer: course_Faq.answer
          },
          course_Testimonial: {
            star: course_Testimonial.star,
            name: course_Testimonial.name,
            profileImg: course_Testimonial.profileImg,
            review: course_Testimonial.review
          },
          course_Seo: {
            name: course_Seo.name,
            property: course_Seo.property,
            content: course_Seo.content
          }
        }).from(courses).where(
          sql`courses.slug = ${slug} and courses.deletedAt is null and courses.status = 'published'`
        ).leftJoin(categories, eq5(courses.categoryId, categories.id)).leftJoin(
          course_learningMaterial,
          eq5(courses.id, course_learningMaterial.courseId)
        ).leftJoin(course_Feature, eq5(courses.id, course_Feature.courseId)).leftJoin(course_Benefit, eq5(courses.id, course_Benefit.courseId)).leftJoin(course_Faq, eq5(courses.id, course_Faq.courseId)).leftJoin(course_Testimonial, eq5(courses.id, course_Testimonial.courseId)).leftJoin(course_Seo, eq5(courses.id, course_Seo.courseId));
        const result = rows.reduce((acc, row) => {
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
              seo: []
            };
          }
          if (learningMaterial) {
            if (!acc[course.id].learningMaterials.some(
              (lm) => lm.kkni === learningMaterial.kkni
            ))
              acc[course.id].learningMaterials.push(learningMaterial);
          }
          if (feature) {
            if (!acc[course.id].features.some(
              (f) => f.feature === feature.feature
            ))
              acc[course.id].features.push(feature);
          }
          if (benefit) {
            if (!acc[course.id].benefits.some(
              (b) => b.benefit === benefit.benefit
            ))
              acc[course.id].benefits.push(benefit);
          }
          if (faq) {
            if (!acc[course.id].faqs.some((f) => f.question === faq.question))
              acc[course.id].faqs.push(faq);
          }
          if (testimonial) {
            if (!acc[course.id].testimonials.some(
              (t) => t.name === testimonial.name
            ))
              acc[course.id].testimonials.push(testimonial);
          }
          if (seo) {
            if (!acc[course.id].seo.some((s) => s.property === seo.property))
              acc[course.id].seo.push(seo);
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
        Object.values(result).forEach((courseData) => {
          courseData.seo = courseData.seo.map(filterNullValues);
        });
        return result[Number(Object.keys(result)[0])];
      }
      async update(slug, updateCourseDto) {
        const course = await db.select().from(courses).where(sql`courses.slug = ${slug} and courses.deletedAt is null`);
        if (course.length === 0) {
          throw new Error("Course not found");
        }
        if (updateCourseDto.title) {
          const newSlug = slugify2(updateCourseDto.title, {
            replacement: "-",
            lower: true
          });
          if (newSlug !== slug) {
            await db.update(courses).set({ ...updateCourseDto, slug: newSlug }).where(eq5(courses.slug, slug));
            return "Course updated successfully!";
          }
        }
        await db.update(courses).set(updateCourseDto).where(eq5(courses.slug, slug));
        return "Course updated successfully!";
      }
      async delete(slug) {
        await db.update(courses).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq5(courses.slug, slug));
        return "Course deleted successfully!";
      }
      async coursesDraft(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageCourse = await db.select({
          title: courses.title,
          slug: courses.slug,
          thumbnail: courses.thumbnail,
          price: courses.price,
          discount: courses.discount,
          discountPrice: courses.discountPrice
        }).from(courses).orderBy(desc3(courses.id)).limit(limit).offset(offset);
        return pageCourse;
      }
    };
  }
});

// src/module/courses/course/course.controller.ts
import fs from "fs";
import sharp from "sharp";
var CoursesController;
var init_course_controller = __esm({
  "src/module/courses/course/course.controller.ts"() {
    "use strict";
    init_course_service();
    CoursesController = class {
      constructor(coursesService = new CoursesService()) {
        this.coursesService = coursesService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.coursesService.getAll(page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createCourseDto = req.body;
        if (req.file) {
          const files = req.files;
          const heroImg = {
            buffer: files.heroImg[0].buffer
          };
          const thumbnail = {
            buffer: files.thumbnail[0].buffer
          };
          fs.access("./public/images/course/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const heroImgRef = `${timestamp2}-${randomSuffix}.webp`;
          const thumbnailRef = `${timestamp2}-${randomSuffix}.webp`;
          await sharp(heroImg.buffer).webp({ quality: 20 }).toFile("./public/images/course/" + heroImgRef);
          await sharp(thumbnail.buffer).webp({ quality: 20 }).toFile("./public/images/course/" + thumbnailRef);
          const heroImgLink = `/images/course/${heroImgRef}`;
          const thumbnailLink = `/images/course/${thumbnailRef}`;
          createCourseDto.heroImg = heroImgLink;
          createCourseDto.thumbnail = thumbnailLink;
        }
        try {
          const result = await this.coursesService.create(createCourseDto);
          return res.status(201).json(result);
        } catch (error) {
          console.error("Error in CoursesController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const courseSlug = req.params.slug;
          const course = await this.coursesService.show(courseSlug);
          if (!course) {
            return res.status(404).json({ error: "Course not found" });
          }
          return res.json(course);
        } catch (error) {
          console.error("Error in CoursesController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseSlug = req.params.slug;
        const updateCourseDto = req.body;
        if (req.file) {
          const files = req.files;
          const heroImg = {
            buffer: files.heroImg[0].buffer
          };
          const thumbnail = {
            buffer: files.thumbnail[0].buffer
          };
          fs.access("./public/images/course/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const heroImgRef = `${timestamp2}-${randomSuffix}.webp`;
          const thumbnailRef = `${timestamp2}-${randomSuffix}.webp`;
          await sharp(heroImg.buffer).webp({ quality: 20 }).toFile("./public/images/course/" + heroImgRef);
          await sharp(thumbnail.buffer).webp({ quality: 20 }).toFile("./public/images/course/" + thumbnailRef);
          const heroImgLink = `/images/course/${heroImgRef}`;
          const thumbnailLink = `/images/course/${thumbnailRef}`;
          updateCourseDto.heroImg = heroImgLink;
          updateCourseDto.thumbnail = thumbnailLink;
        }
        try {
          await this.coursesService.update(courseSlug, updateCourseDto);
          return res.json({ message: "Course updated successfully" });
        } catch (error) {
          console.error("Error in CoursesController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const courseSlug = req.params.slug;
        try {
          await this.coursesService.delete(courseSlug);
          return res.json({ message: "Course deleted successfully" });
        } catch (error) {
          console.error("Error in CoursesController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      coursesDraft = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.coursesService.coursesDraft(page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.coursesDraft:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/course/course.route.ts
var course_route_exports = {};
__export(course_route_exports, {
  default: () => course_route_default
});
import { Router as Router4 } from "express";
import multer from "multer";
var storage, upload, router4, courseController, course_route_default;
var init_course_route = __esm({
  "src/module/courses/course/course.route.ts"() {
    "use strict";
    init_course_controller();
    init_checkAuth();
    init_checkRole();
    storage = multer.memoryStorage();
    upload = multer({ storage });
    router4 = Router4();
    courseController = new CoursesController();
    router4.get("/", courseController.getAll).get(
      "/draft",
      [checkAuth, checkRole(["admin", "user"])],
      courseController.coursesDraft
    ).post(
      "/create",
      [checkAuth, checkRole(["admin", "user"])],
      upload.fields([
        { name: "heroImg", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
      ]),
      courseController.create
    ).get("/:slug", courseController.show).patch(
      "/update/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      upload.fields([
        { name: "heroImg", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
      ]),
      courseController.update
    ).patch(
      "/delete/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      courseController.delete
    );
    course_route_default = router4;
  }
});

// src/module/courses/learning-material/learning-material.service.ts
import { eq as eq6, sql as sql2 } from "drizzle-orm";
var LearningMaterialService;
var init_learning_material_service = __esm({
  "src/module/courses/learning-material/learning-material.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    LearningMaterialService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageLearningMaterial = await db.select({
          id: course_learningMaterial.id,
          kkni: course_learningMaterial.kkni,
          kkni_title: course_learningMaterial.kkni_title,
          description: course_learningMaterial.description
        }).from(course_learningMaterial).where(
          sql2`course_learningMaterial.courseId = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq6(course_learningMaterial.courseId, courses.id)).limit(limit).offset(offset);
        return pageLearningMaterial;
      }
      async create(CreatelearningMaterialDto) {
        const existingLearningMaterial = await db.select({
          kkni: course_learningMaterial.kkni
        }).from(course_learningMaterial).where(eq6(course_learningMaterial.kkni, CreatelearningMaterialDto.kkni));
        if (existingLearningMaterial.length > 0) {
          throw new Error("Learning Material already exists");
        }
        await db.insert(course_learningMaterial).values(CreatelearningMaterialDto);
        return "LearningMaterial created successfully!";
      }
      async update(UpdatelearningMaterialDto) {
        try {
          for (const dto of UpdatelearningMaterialDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(course_learningMaterial).set(dto).where(eq6(course_learningMaterial.id, dto.id));
          }
          return "LearningMaterial updated successfully!";
        } catch (error) {
          console.error("Error in LearningMaterialService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_learningMaterial).where(eq6(course_learningMaterial.id, id));
        return "LearningMaterial deleted successfully!";
      }
    };
  }
});

// src/module/courses/learning-material/learning-material.controller.ts
var LearningMaterialController;
var init_learning_material_controller = __esm({
  "src/module/courses/learning-material/learning-material.controller.ts"() {
    "use strict";
    init_learning_material_service();
    LearningMaterialController = class {
      constructor(learningMaterialService = new LearningMaterialService()) {
        this.learningMaterialService = learningMaterialService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.learningMaterialService.getAll(
            courseId,
            page,
            limit
          );
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createlearningMaterialDto = req.body;
        const createdData = [];
        createlearningMaterialDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].courseId = courseId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.learningMaterialService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in LearningMaterialController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatelearningMaterialDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatelearningMaterialDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].courseId = courseId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.learningMaterialService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.learningMaterialService.update(updatedData);
          }
          return res.json({ message: "Learning Material updated successfully" });
        } catch (error) {
          console.error("Error in LearningMaterialController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const learningmaterialId = Number(req.params.id);
        try {
          await this.learningMaterialService.delete(learningmaterialId);
          return res.json({ message: "Learning Material deleted successfully" });
        } catch (error) {
          console.error("Error in LearningMaterialController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/learning-material/learning-material.route.ts
var learning_material_route_exports = {};
__export(learning_material_route_exports, {
  default: () => learning_material_route_default
});
import { Router as Router5 } from "express";
var router5, learningMaterialController, learning_material_route_default;
var init_learning_material_route = __esm({
  "src/module/courses/learning-material/learning-material.route.ts"() {
    "use strict";
    init_learning_material_controller();
    init_checkAuth();
    init_checkRole();
    router5 = Router5();
    learningMaterialController = new LearningMaterialController();
    router5.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      learningMaterialController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      learningMaterialController.create
    ).patch(
      "/update/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      learningMaterialController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      learningMaterialController.delete
    );
    learning_material_route_default = router5;
  }
});

// src/module/courses/faq/faq.service.ts
import { eq as eq7, sql as sql3 } from "drizzle-orm";
var FaqService;
var init_faq_service = __esm({
  "src/module/courses/faq/faq.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    FaqService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageFaq = await db.select({
          id: course_Faq.id,
          kkni: course_Faq.question,
          kkni_title: course_Faq.answer
        }).from(course_Faq).where(
          sql3`course_Faq.courseId = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq7(course_Faq.courseId, courses.id)).limit(limit).offset(offset);
        if (pageFaq.length === 0) {
          return { message: "No Faq found" };
        }
        return pageFaq;
      }
      async create(CreateFaqDto) {
        const existingFaq = await db.select({
          kkni: course_Faq.question
        }).from(course_Faq).where(eq7(course_Faq.question, CreateFaqDto.question));
        if (existingFaq.length > 0) {
          throw new Error("Learning Material already exists");
        }
        await db.insert(course_Faq).values(CreateFaqDto);
        return "Faq created successfully!";
      }
      async update(UpdateFaqDto) {
        try {
          for (const dto of UpdateFaqDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(course_Faq).set(dto).where(eq7(course_Faq.id, dto.id));
          }
          return "Faq updated successfully!";
        } catch (error) {
          console.error("Error in FaqService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_Faq).where(eq7(course_Faq.id, id));
        return "Faq deleted successfully!";
      }
    };
  }
});

// src/module/courses/faq/faq.controller.ts
var FaqController;
var init_faq_controller = __esm({
  "src/module/courses/faq/faq.controller.ts"() {
    "use strict";
    init_faq_service();
    FaqController = class {
      constructor(faqService = new FaqService()) {
        this.faqService = faqService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.faqService.getAll(courseId, page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createFaqDto = req.body;
        const createdData = [];
        createFaqDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].courseId = courseId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.faqService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in FaqController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatefaqDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatefaqDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].courseId = courseId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.faqService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.faqService.update(updatedData);
          }
          return res.json({ message: "Faq updated successfully" });
        } catch (error) {
          console.error("Error in FaqController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const faqId = Number(req.params.id);
        try {
          await this.faqService.delete(faqId);
          return res.json({ message: "Faq deleted successfully" });
        } catch (error) {
          console.error("Error in FaqController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/faq/faq.route.ts
var faq_route_exports = {};
__export(faq_route_exports, {
  default: () => faq_route_default
});
import { Router as Router6 } from "express";
var router6, faqController, faq_route_default;
var init_faq_route = __esm({
  "src/module/courses/faq/faq.route.ts"() {
    "use strict";
    init_faq_controller();
    init_checkAuth();
    init_checkRole();
    router6 = Router6();
    faqController = new FaqController();
    router6.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      faqController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      faqController.create
    ).patch(
      "/update/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      faqController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      faqController.delete
    );
    faq_route_default = router6;
  }
});

// src/module/courses/feature/feature.service.ts
import { eq as eq8, sql as sql4 } from "drizzle-orm";
var FeatureService;
var init_feature_service = __esm({
  "src/module/courses/feature/feature.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    FeatureService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageFeature = await db.select({
          id: course_Feature.id,
          feature: course_Feature.feature
        }).from(course_Feature).where(
          sql4`course_Feature.courseId = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq8(course_Feature.courseId, courses.id)).limit(limit).offset(offset);
        return pageFeature;
      }
      async create(CreateFeatureDto) {
        await db.insert(course_Feature).values(CreateFeatureDto);
        return "Feature created successfully!";
      }
      async update(UpdateFeatureDto) {
        try {
          for (const dto of UpdateFeatureDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(course_Feature).set(dto).where(eq8(course_Feature.id, dto.id));
          }
          return "Feature updated successfully!";
        } catch (error) {
          console.error("Error in FeatureService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_Feature).where(eq8(course_Feature.id, id));
        return "Feature deleted successfully!";
      }
    };
  }
});

// src/module/courses/feature/feature.controller.ts
var FeatureController;
var init_feature_controller = __esm({
  "src/module/courses/feature/feature.controller.ts"() {
    "use strict";
    init_feature_service();
    FeatureController = class {
      constructor(featureService = new FeatureService()) {
        this.featureService = featureService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.featureService.getAll(courseId, page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createFeatureDto = req.body;
        const createdData = [];
        createFeatureDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].courseId = courseId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.featureService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in FeatureController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatefeatureDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatefeatureDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].courseId = courseId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.featureService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.featureService.update(updatedData);
          }
          return res.json({ message: "Feature updated successfully" });
        } catch (error) {
          console.error("Error in FeatureController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const featureId = Number(req.params.id);
        try {
          await this.featureService.delete(featureId);
          return res.json({ message: "Feature deleted successfully" });
        } catch (error) {
          console.error("Error in FeatureController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/feature/feature.route.ts
var feature_route_exports = {};
__export(feature_route_exports, {
  default: () => feature_route_default
});
import { Router as Router7 } from "express";
var router7, featureController, feature_route_default;
var init_feature_route = __esm({
  "src/module/courses/feature/feature.route.ts"() {
    "use strict";
    init_feature_controller();
    init_checkAuth();
    init_checkRole();
    router7 = Router7();
    featureController = new FeatureController();
    router7.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      featureController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      featureController.create
    ).patch(
      "/update/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      featureController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      featureController.delete
    );
    feature_route_default = router7;
  }
});

// src/module/courses/benefit/benefit.service.ts
import { eq as eq9, sql as sql5 } from "drizzle-orm";
var BenefitService;
var init_benefit_service = __esm({
  "src/module/courses/benefit/benefit.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    BenefitService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageBenefit = await db.select({
          id: course_Benefit.id,
          benefit: course_Benefit.benefit
        }).from(course_Benefit).where(
          sql5`course_Benefit.slug = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq9(course_Benefit.courseId, courses.id)).limit(limit).offset(offset);
        if (pageBenefit.length === 0) {
          return { message: "No Benefit found" };
        }
        return pageBenefit;
      }
      async create(CreateBenefitDto) {
        await db.insert(course_Benefit).values(CreateBenefitDto);
        return "Benefit created successfully!";
      }
      async update(UpdateBenefitDto) {
        try {
          for (const dto of UpdateBenefitDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(course_Benefit).set(dto).where(eq9(course_Benefit.id, dto.id));
          }
          return "Benefit updated successfully!";
        } catch (error) {
          console.error("Error in BenefitService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_Benefit).where(eq9(course_Benefit.id, id));
        return "Benefit deleted successfully!";
      }
    };
  }
});

// src/module/courses/benefit/benefit.controller.ts
var BenefitController;
var init_benefit_controller = __esm({
  "src/module/courses/benefit/benefit.controller.ts"() {
    "use strict";
    init_benefit_service();
    BenefitController = class {
      constructor(benefitService = new BenefitService()) {
        this.benefitService = benefitService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.benefitService.getAll(courseId, page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createBenefitDto = req.body;
        const createdData = [];
        createBenefitDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].courseId = courseId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.benefitService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in BenefitController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updatebenefitDto = req.body;
        const createdData = [];
        const updatedData = [];
        updatebenefitDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].courseId = courseId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.benefitService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.benefitService.update(updatedData);
          }
          return res.json({ message: "Benefit updated successfully" });
        } catch (error) {
          console.error("Error in BenefitController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const benefitId = Number(req.params.id);
        try {
          await this.benefitService.delete(benefitId);
          return res.json({ message: "Benefit deleted successfully" });
        } catch (error) {
          console.error("Error in BenefitController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/benefit/benefit.route.ts
var benefit_route_exports = {};
__export(benefit_route_exports, {
  default: () => benefit_route_default
});
import { Router as Router8 } from "express";
var router8, benefitController, benefit_route_default;
var init_benefit_route = __esm({
  "src/module/courses/benefit/benefit.route.ts"() {
    "use strict";
    init_benefit_controller();
    init_checkAuth();
    init_checkRole();
    router8 = Router8();
    benefitController = new BenefitController();
    router8.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      benefitController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      benefitController.create
    ).patch(
      "/update/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      benefitController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      benefitController.delete
    );
    benefit_route_default = router8;
  }
});

// src/module/courses/seo/seo.service.ts
import { eq as eq10, sql as sql6 } from "drizzle-orm";
var SeoService;
var init_seo_service = __esm({
  "src/module/courses/seo/seo.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    SeoService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageSeo = await db.select({
          id: course_Seo.id,
          name: course_Seo.name,
          property: course_Seo.property,
          content: course_Seo.content
        }).from(course_Seo).where(
          sql6`course_Seo.courseId = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq10(course_Seo.courseId, courses.id)).limit(limit).offset(offset);
        function removeNullKeys(obj) {
          for (let prop in obj) {
            if (obj[prop] === null) {
              delete obj[prop];
            } else if (typeof obj[prop] === "object") {
              removeNullKeys(obj[prop]);
            }
          }
          return obj;
        }
        return pageSeo.map((seo) => removeNullKeys(seo));
      }
      async create(CreateSeoDto) {
        await db.insert(course_Seo).values(CreateSeoDto);
        return "Seo created successfully!";
      }
      async update(UpdateSeoDto) {
        try {
          for (const dto of UpdateSeoDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(course_Seo).set(dto).where(eq10(course_Seo.id, dto.id));
          }
          return "Seo updated successfully!";
        } catch (error) {
          console.error("Error in SeoService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_Seo).where(eq10(course_Seo.id, id));
        return "Seo deleted successfully!";
      }
    };
  }
});

// src/module/courses/seo/seo.controller.ts
var SeoController;
var init_seo_controller = __esm({
  "src/module/courses/seo/seo.controller.ts"() {
    "use strict";
    init_seo_service();
    SeoController = class {
      constructor(seoService = new SeoService()) {
        this.seoService = seoService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.seoService.getAll(courseId, page, limit);
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createSeoDto = req.body;
        const createdData = [];
        createSeoDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].courseId = courseId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.seoService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in SeoController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const updateseoDto = req.body;
        const createdData = [];
        const updatedData = [];
        updateseoDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].courseId = courseId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].courseId = courseId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.seoService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.seoService.update(updatedData);
          }
          return res.json({ message: "Seo updated successfully" });
        } catch (error) {
          console.error("Error in SeoController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const seoId = Number(req.params.id);
        try {
          await this.seoService.delete(seoId);
          return res.json({ message: "Seo deleted successfully" });
        } catch (error) {
          console.error("Error in SeoController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/seo/seo.route.ts
var seo_route_exports = {};
__export(seo_route_exports, {
  default: () => seo_route_default
});
import { Router as Router9 } from "express";
var router9, seoController, seo_route_default;
var init_seo_route = __esm({
  "src/module/courses/seo/seo.route.ts"() {
    "use strict";
    init_seo_controller();
    init_checkAuth();
    init_checkRole();
    router9 = Router9();
    seoController = new SeoController();
    router9.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController.create
    ).patch(
      "/update/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      seoController.delete
    );
    seo_route_default = router9;
  }
});

// src/module/courses/testimonial/testimonial.service.ts
import { eq as eq11, sql as sql7 } from "drizzle-orm";
var TestimonialService;
var init_testimonial_service = __esm({
  "src/module/courses/testimonial/testimonial.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    TestimonialService = class {
      async getAll(courseId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageTestimonial = await db.select({
          id: course_Testimonial.id,
          star: course_Testimonial.star,
          name: course_Testimonial.name,
          profileImg: course_Testimonial.profileImg,
          review: course_Testimonial.review
        }).from(course_Testimonial).where(
          sql7`course_Testimonial.courseId = ${courseId} and courses.deletedAt is null`
        ).leftJoin(courses, eq11(course_Testimonial.courseId, courses.id)).limit(limit).offset(offset);
        return pageTestimonial;
      }
      async create(CreateTestimonialDto) {
        try {
          await db.insert(course_Testimonial).values(CreateTestimonialDto);
          return "Testimonial created successfully!";
        } catch (error) {
          console.error("Error in TestimonialService.create:", error);
          throw new Error("Failed to create Testimonial");
        }
      }
      async update(testimonialId, UpdateTestimonialDto) {
        try {
          await db.update(course_Testimonial).set(UpdateTestimonialDto).where(eq11(course_Testimonial.id, testimonialId));
          return "Testimonial updated successfully!";
        } catch (error) {
          console.error("Error in TestimonialService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(course_Testimonial).where(eq11(course_Testimonial.id, id));
        return "Testimonial deleted successfully!";
      }
    };
  }
});

// src/module/courses/testimonial/testimonial.controller.ts
import fs2 from "fs";
import sharp2 from "sharp";
var TestimonialController;
var init_testimonial_controller = __esm({
  "src/module/courses/testimonial/testimonial.controller.ts"() {
    "use strict";
    init_testimonial_service();
    TestimonialController = class {
      constructor(testimonialService = new TestimonialService()) {
        this.testimonialService = testimonialService;
      }
      getAll = async (req, res) => {
        try {
          const courseId = Number(req.params.courseId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const courses2 = await this.testimonialService.getAll(
            courseId,
            page,
            limit
          );
          return res.json(courses2);
        } catch (error) {
          console.error("Error in CoursesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const courseId = Number(req.params.courseId);
        const createTestimonialDto = req.body;
        if (req.file) {
          console.log(req.file);
          fs2.access("./public/images/testimonial/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const { buffer } = req.file;
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const ref = `${timestamp2}-${randomSuffix}.webp`;
          await sharp2(buffer).webp({ quality: 20 }).toFile("./public/images/testimonial/" + ref);
          const link = `/images/testimonial/${ref}`;
          createTestimonialDto.profileImg = link;
        }
        createTestimonialDto.courseId = courseId;
        try {
          const result = await this.testimonialService.create(createTestimonialDto);
          return res.status(201).json({ message: result });
        } catch (error) {
          console.error("Error in TestimonialController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const testimonialId = Number(req.params.id);
        const updatetestimonialDto = req.body;
        if (req.file) {
          console.log(req.file);
          fs2.access("./public/images/testimonial/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const { buffer } = req.file;
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const ref = `${timestamp2}-${randomSuffix}.webp`;
          await sharp2(buffer).webp({ quality: 20 }).toFile("./public/images/testimonial/" + ref);
          const link = `/images/testimonial/${ref}`;
          updatetestimonialDto.profileImg = link;
        }
        try {
          const result = await this.testimonialService.update(
            testimonialId,
            updatetestimonialDto
          );
          return res.json({ message: result });
        } catch (error) {
          console.error("Error in TestimonialController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const testimonialId = Number(req.params.id);
        try {
          await this.testimonialService.delete(testimonialId);
          return res.json({ message: "Testimonial deleted successfully" });
        } catch (error) {
          console.error("Error in TestimonialController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/courses/testimonial/testimonial.route.ts
var testimonial_route_exports = {};
__export(testimonial_route_exports, {
  default: () => testimonial_route_default
});
import { Router as Router10 } from "express";
import multer2 from "multer";
var storage2, upload2, router10, testimonialController, testimonial_route_default;
var init_testimonial_route = __esm({
  "src/module/courses/testimonial/testimonial.route.ts"() {
    "use strict";
    init_testimonial_controller();
    init_checkAuth();
    init_checkRole();
    storage2 = multer2.memoryStorage();
    upload2 = multer2({ storage: storage2 });
    router10 = Router10();
    testimonialController = new TestimonialController();
    router10.get(
      "/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      testimonialController.getAll
    ).post(
      "/create/:courseId",
      [checkAuth, checkRole(["admin", "user"])],
      upload2.single("profileImg"),
      testimonialController.create
    ).patch(
      "/update/:id",
      [checkAuth, checkRole(["admin", "user"])],
      upload2.single("profileImg"),
      testimonialController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      testimonialController.delete
    );
    testimonial_route_default = router10;
  }
});

// src/module/blogs/blog/blog.service.ts
import { desc as desc4, eq as eq12, isNull as isNull5 } from "drizzle-orm";
import slugify3 from "slugify";
var BlogsService;
var init_blog_service = __esm({
  "src/module/blogs/blog/blog.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    BlogsService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageBlog = await db.select({
          title: blogs.title,
          slug: blogs.slug,
          category: categories.name,
          date: blogs.createdAt
        }).from(blogs).where(eq12(blogs.status, "published")).where(isNull5(blogs.deletedAt)).orderBy(desc4(blogs.id)).leftJoin(categories, eq12(blogs.categoryId, categories.id)).limit(limit).offset(offset);
        return pageBlog;
      }
      async create(createBlogDto) {
        const existingBlog = await db.select().from(blogs).where(eq12(blogs.title, createBlogDto.title));
        if (existingBlog.length > 0) {
          throw new Error("Blog already exists");
        }
        const newBlog = {
          ...createBlogDto
        };
        newBlog.slug = slugify3(newBlog.title, {
          replacement: "-",
          lower: true
        });
        const [createdBlogId] = await db.insert(blogs).values(newBlog);
        return {
          blogId: createdBlogId.insertId,
          message: "Blog created successfully!"
        };
      }
      async show(slug) {
        const rows = await db.select({
          blogs: {
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            description: blogs.description,
            category: categories.name
          },
          blog_Seo: {
            name: blog_Seo.name,
            property: blog_Seo.property,
            content: blog_Seo.content
          }
        }).from(blogs).where(eq12(blogs.slug, slug)).where(eq12(blogs.status, "published")).where(isNull5(blogs.deletedAt)).leftJoin(categories, eq12(blogs.categoryId, categories.id)).leftJoin(blog_Seo, eq12(blogs.id, blog_Seo.blogId));
        const result = rows.reduce((acc, row) => {
          const blog = row.blogs;
          const seo = row.blog_Seo;
          if (!acc[blog.id]) {
            acc[blog.id] = {
              blog,
              seo: []
            };
          }
          if (seo) {
            const isSeoExist = acc[blog.id].seo.find(
              (item) => item.property === seo.property
            );
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
        const blog = await db.select().from(blogs).where(eq12(blogs.slug, slug)).where(isNull5(blogs.deletedAt));
        if (blog.length === 0) {
          throw new Error("Blog not found");
        }
        if (updateBlogDto.title) {
          const newSlug = slugify3(updateBlogDto.title, {
            replacement: "-",
            lower: true
          });
          if (newSlug !== slug) {
            await db.update(blogs).set({ ...updateBlogDto, slug: newSlug, updatedAt: /* @__PURE__ */ new Date() }).where(eq12(blogs.slug, slug));
            return "Blog updated successfully!";
          }
        }
        await db.update(blogs).set(updateBlogDto).where(eq12(blogs.slug, slug));
        return "Blog updated successfully!";
      }
      async delete(slug) {
        const blog = await db.select().from(blogs).where(eq12(blogs.slug, slug));
        if (blog.length === 0) {
          throw new Error("Blog not found");
        }
        await db.update(blogs).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq12(blogs.slug, slug));
      }
      async blogsDraft(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageBlog = await db.select({
          title: blogs.title,
          slug: blogs.slug,
          category: categories.name,
          date: blogs.createdAt
        }).from(blogs).where(eq12(blogs.status, "draft")).where(isNull5(blogs.deletedAt)).orderBy(desc4(blogs.id)).limit(limit).offset(offset).leftJoin(categories, eq12(blogs.categoryId, categories.id));
        return pageBlog;
      }
    };
  }
});

// src/module/blogs/blog/blog.controller.ts
var BlogsController;
var init_blog_controller = __esm({
  "src/module/blogs/blog/blog.controller.ts"() {
    "use strict";
    init_blog_service();
    BlogsController = class {
      constructor(blogsService = new BlogsService()) {
        this.blogsService = blogsService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const blogs2 = await this.blogsService.getAll(page, limit);
          return res.json(blogs2);
        } catch (error) {
          console.error("Error in BlogsController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createBlogDto = req.body;
        try {
          const result = await this.blogsService.create(createBlogDto);
          return res.status(201).json(result);
        } catch (error) {
          console.error("Error in BlogsController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const blogSlug = req.params.slug;
          const blog = await this.blogsService.show(blogSlug);
          if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
          }
          return res.json(blog);
        } catch (error) {
          console.error("Error in BlogsController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const blogSlug = req.params.slug;
        const updateBlogDto = req.body;
        try {
          const blog = await this.blogsService.show(blogSlug);
          if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
          }
          await this.blogsService.update(blogSlug, updateBlogDto);
          return res.json({ message: "Blog updated successfully" });
        } catch (error) {
          console.error("Error in BlogsController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const blogSlug = req.params.slug;
        try {
          const blog = await this.blogsService.show(blogSlug);
          if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
          }
          await this.blogsService.delete(blogSlug);
          return res.json({ message: "Blog deleted successfully" });
        } catch (error) {
          console.error("Error in BlogsController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      blogsDraft = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const blogs2 = await this.blogsService.blogsDraft(page, limit);
          return res.json(blogs2);
        } catch (error) {
          console.error("Error in BlogsController.blogsDraft:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/blogs/blog/blog.route.ts
var blog_route_exports = {};
__export(blog_route_exports, {
  default: () => blog_route_default
});
import { Router as Router11 } from "express";
var router11, blogController, blog_route_default;
var init_blog_route = __esm({
  "src/module/blogs/blog/blog.route.ts"() {
    "use strict";
    init_blog_controller();
    init_checkAuth();
    init_checkRole();
    router11 = Router11();
    blogController = new BlogsController();
    router11.get("/", blogController.getAll).get(
      "/draft",
      [checkAuth, checkRole(["admin", "user"])],
      blogController.blogsDraft
    ).post(
      "/create",
      [checkAuth, checkRole(["admin", "user"])],
      blogController.create
    ).get("/:slug", blogController.show).patch(
      "/update/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      blogController.update
    ).patch(
      "/delete/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      blogController.delete
    );
    blog_route_default = router11;
  }
});

// src/module/blogs/seo/seo.service.ts
import { eq as eq13, isNull as isNull6 } from "drizzle-orm";
var SeoService2;
var init_seo_service2 = __esm({
  "src/module/blogs/seo/seo.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    SeoService2 = class {
      async getAll(blogId, page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        const offset = (page - 1) * limit;
        const pageSeo = await db.select({
          id: blog_Seo.id,
          name: blog_Seo.name,
          property: blog_Seo.property,
          content: blog_Seo.content
        }).from(blog_Seo).where(eq13(blog_Seo.blogId, blogId)).where(isNull6(blogs.deletedAt)).leftJoin(blogs, eq13(blog_Seo.blogId, blogs.id)).limit(limit).offset(offset);
        function removeNullKeys(obj) {
          for (let prop in obj) {
            if (obj[prop] === null) {
              delete obj[prop];
            } else if (typeof obj[prop] === "object") {
              removeNullKeys(obj[prop]);
            }
          }
          return obj;
        }
        return pageSeo.map((seo) => removeNullKeys(seo));
      }
      async create(CreateSeoDto) {
        await db.insert(blog_Seo).values(CreateSeoDto);
        return "Seo created successfully!";
      }
      async update(UpdateSeoDto) {
        try {
          for (const dto of UpdateSeoDto) {
            if (!dto.id) {
              throw new Error('Invalid data. "id" is required for update.');
            }
            await db.update(blog_Seo).set(dto).where(eq13(blog_Seo.id, dto.id));
          }
          return "Seo updated successfully!";
        } catch (error) {
          console.error("Error in SeoService.update:", error);
          throw new Error("Failed to update Learning Material");
        }
      }
      async delete(id) {
        await db.delete(blog_Seo).where(eq13(blog_Seo.id, id));
        return "Seo deleted successfully!";
      }
    };
  }
});

// src/module/blogs/seo/seo.controller.ts
var SeoController2;
var init_seo_controller2 = __esm({
  "src/module/blogs/seo/seo.controller.ts"() {
    "use strict";
    init_seo_service2();
    SeoController2 = class {
      constructor(seoService = new SeoService2()) {
        this.seoService = seoService;
      }
      getAll = async (req, res) => {
        try {
          const blogId = Number(req.params.blogId);
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const blogs2 = await this.seoService.getAll(blogId, page, limit);
          return res.json(blogs2);
        } catch (error) {
          console.error("Error in BlogsController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const blogId = Number(req.params.blogId);
        const createSeoDto = req.body;
        const createdData = [];
        createSeoDto.forEach((item) => {
          createdData.push(item);
          createdData[createdData.length - 1].blogId = blogId;
        });
        try {
          if (createdData.length > 0) {
            const result = await this.seoService.create(createdData);
            return res.status(201).json({ message: result });
          }
        } catch (error) {
          console.error("Error in SeoController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const blogId = Number(req.params.blogId);
        const updateseoDto = req.body;
        const createdData = [];
        const updatedData = [];
        updateseoDto.forEach((item) => {
          if (item && item.hasOwnProperty("id")) {
            updatedData.push(item);
            updatedData[updatedData.length - 1].blogId = blogId;
          } else {
            createdData.push(item);
            createdData[createdData.length - 1].blogId = blogId;
          }
        });
        try {
          if (createdData.length > 0) {
            await this.seoService.create(createdData);
          }
          if (updatedData.length > 0) {
            await this.seoService.update(updatedData);
          }
          return res.json({ message: "Seo updated successfully" });
        } catch (error) {
          console.error("Error in SeoController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const seoId = Number(req.params.id);
        try {
          await this.seoService.delete(seoId);
          return res.json({ message: "Seo deleted successfully" });
        } catch (error) {
          console.error("Error in SeoController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/blogs/seo/seo.route.ts
var seo_route_exports2 = {};
__export(seo_route_exports2, {
  default: () => seo_route_default2
});
import { Router as Router12 } from "express";
var router12, seoController2, seo_route_default2;
var init_seo_route2 = __esm({
  "src/module/blogs/seo/seo.route.ts"() {
    "use strict";
    init_seo_controller2();
    init_checkAuth();
    init_checkRole();
    router12 = Router12();
    seoController2 = new SeoController2();
    router12.get(
      "/:blogId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController2.getAll
    ).post(
      "/create/:blogId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController2.create
    ).patch(
      "/update/:blogId",
      [checkAuth, checkRole(["admin", "user"])],
      seoController2.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      seoController2.delete
    );
    seo_route_default2 = router12;
  }
});

// src/config/google-analytic/index.ts
import * as dotenv2 from "dotenv";
var config4, google_analytic_default;
var init_google_analytic = __esm({
  "src/config/google-analytic/index.ts"() {
    "use strict";
    dotenv2.config();
    config4 = {
      analytic: {
        propertyId: process.env.ANALYTIC_MEASUREMENT_ID,
        apiSecret: process.env.ANALYTIC_API_SECRET
      }
    };
    google_analytic_default = config4;
  }
});

// src/config/google-analytic/service-account-key.json
var require_service_account_key = __commonJS({
  "src/config/google-analytic/service-account-key.json"(exports, module) {
    module.exports = {
      type: "service_account",
      project_id: "analytic-394005",
      private_key_id: "9f4cd7480dd36d694cd11840d97ee51aaa8e94ed",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmqP37kinhVqrA\n3KvYU7JR4lw+AlhisHUdzbgAmZd17GF9Ax53TWjH4GAXUiTiVk9S0Fx0q1uMoo7t\nnVO6WLB7ve01XEZjt13k7CxhQ7wH3lTy6irpBn9nf9qvY4LYIuDIwc0bURrpO3Dy\nVRJ9jpvSehzhilcj5P90FosRZ+JXCldLd7YeGtxpQlORYzzY7ZwZhR5+5jGMydhf\n8mJh7VRxYxkM2k02nW+F3N0Q3h0khscXdT9IKmCTLs2upF+KDo1B659SqSVRXu2s\n2Xu3UI01dgN+HKXUaXj6hgzBqoSYB+40IQAsDtz7KU0rSjvQRbtNu3XnuF47oBuH\nb7+/fJyPAgMBAAECggEADdsB1o7lxXKnmoYeEUuQCSe5BHy8bWP/MJ2gPQiH44ll\n53dBaqi4W9mnE3lEUL7dNGTXMunmIBCJsm6Aff8OmRMGrAeCYJrnhvctj16KvNq6\nlEFslNfx8qBaBXfP8nkf2ADotOsuwhIrhzIUafTXto1pZkTSjszkgfm30RgiZJr4\nkohXEnxZ8tc9o5DbdRub8gMgpGNNbP96+HqO8xtHiybkZa4x78R2CqWAmWzPNyop\n72SlYzMEM52bWPnYweCcfMZTDynWdECXYy3yTOqwURmGSgJ4F8zVeye+ggnICJU4\nYj3QyEF7EyXuRH2MTPC5htCe7MCGwzapl9jbkcmczQKBgQDb2LlI+16et8qEVDjE\nH3Ea9BbqzhiHrNvJa5dJuemw/xedeLFOD52XDXvlRDSAxhn/8Te7VBgNpVpIsuuk\nP46pjlueQ8/idw4dEhdAWSarmWot4aHYMQXK2QC680Dw2YZHhag9hDkKY0xpUUI8\nh3K1p/AAxYneShlEj57lHM/A/QKBgQDCES7JeF6sMaKjPwWiSOf7KV+zHUWUP1CQ\nltR8ih7oDGLzGzEeomNMlvDTY6GF0StAiJOybeLBgMM1Ap6Mvc7Uz/labMD81x5Y\nkUyIzmOFeyn1EP3LNLH32f+XZuPUbQuaEVfYkimhCoHKD3ZaLaRd+nSeBE0cLqJ/\n7Vcka1FfewKBgGuahw3WovhSgtgEFQjBTu3fXLwuhckabTUH6TOXwG72XEuiAD5x\n3DNL0UFlAcGptJ4WJa4VufQr46XDlRx+U0hgOi2biUuR9CF8ck73k7rXyyWL01hq\nnigr0HSwjS+VeGjXXYJGjlisQ4Ek2aOgtB9/hDQMe6+GWxm4phAD6xfNAoGALgyj\nvHzKgjOY8wGeVZ7VJRzxL3BPtVi8xkJ0E0U3BjsCM8uNAUbpJyBd7tsiVb2HdN2z\nplA60U27hFWlx6G2dXsQISvTM2vcMInxzjijFuZd01//yPstC7H32zY3840Yhqt8\n28/6/tKeb5Lxs35HFWG70E8W+Qv71T09Q1AP1AcCgYEAxVvDQAOm9aA4mVMjHyKW\noh4t/dFYRwxx2xzOGMwsZF4jR1Fs0uOTWxSBDnpzXzmdOOFIiiIsXavFRkOlySEk\nZINGNuCuNbTX1J4VG0EfyXIEWgH3Wua+534Vk9ieUzM+Gzb0AgMNWrfWi7TDTFfR\nyIjrUFj2EUhziFgZb2K3MHY=\n-----END PRIVATE KEY-----\n",
      client_email: "landingpage@analytic-394005.iam.gserviceaccount.com",
      client_id: "103905751177588832912",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/landingpage%40analytic-394005.iam.gserviceaccount.com",
      universe_domain: "googleapis.com"
    };
  }
});

// src/module/analytic/analytic.controller.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";
var propertyId, keyFile, analyticsDataClient, reportRealtime, report;
var init_analytic_controller = __esm({
  "src/module/analytic/analytic.controller.ts"() {
    "use strict";
    init_google_analytic();
    propertyId = google_analytic_default.analytic.propertyId;
    keyFile = require_service_account_key();
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: keyFile
    });
    reportRealtime = async (req, res) => {
      try {
        const [response] = await analyticsDataClient.runRealtimeReport({
          property: `properties/${propertyId}`,
          dimensions: [
            {
              name: "country"
            },
            {
              name: "city"
            }
          ],
          metrics: [
            {
              name: "activeUsers"
            }
          ]
        });
        if (!response || !response.rows) {
          res.status(500).json({ error: "No data available." });
          return;
        }
        const countryDataMap = /* @__PURE__ */ new Map();
        let totalCountryUsers = 0;
        response.rows.forEach((row) => {
          const country = row.dimensionValues?.[0]?.value;
          const city = row.dimensionValues?.[1]?.value;
          const activeUsers = parseInt(row.metricValues?.[0]?.value || "0");
          if (country) {
            if (!countryDataMap.has(country)) {
              countryDataMap.set(country, {
                country,
                TotalUser: 0,
                cities: []
              });
            }
            const countryData = countryDataMap.get(country);
            countryData.TotalUser += activeUsers;
            totalCountryUsers += activeUsers;
            if (city) {
              countryData.cities.push({ city, activeUser: activeUsers });
            }
          }
        });
        const modifiedResponse = Array.from(countryDataMap.values());
        const responseData = {
          totalCountry: modifiedResponse.length,
          totalUser: totalCountryUsers,
          countries: modifiedResponse
        };
        res.json(responseData);
      } catch (error) {
        res.status(500).json({ error: "An error occurred while processing the data." });
      }
    };
    report = async (req, res) => {
      try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const [response] = await analyticsDataClient.runReport({
          property: `properties/${propertyId}`,
          dateRanges: [
            {
              startDate,
              endDate
            }
          ],
          dimensions: [
            {
              name: "country"
            },
            {
              name: "city"
            }
          ],
          metrics: [
            {
              name: "activeUsers"
            }
          ]
        });
        if (!response || !response.rows) {
          res.status(500).json({ error: "No data available." });
          return;
        }
        const countryDataMap = /* @__PURE__ */ new Map();
        let totalCountryUsers = 0;
        response.rows.forEach((row) => {
          const country = row.dimensionValues?.[0]?.value;
          const city = row.dimensionValues?.[1]?.value;
          const activeUsers = parseInt(row.metricValues?.[0]?.value || "0");
          if (country) {
            if (!countryDataMap.has(country)) {
              countryDataMap.set(country, {
                country,
                TotalUser: 0,
                cities: []
              });
            }
            const countryData = countryDataMap.get(country);
            countryData.TotalUser += activeUsers;
            totalCountryUsers += activeUsers;
            if (city) {
              countryData.cities.push({ city, activeUser: activeUsers });
            }
          }
        });
        const modifiedResponse = Array.from(countryDataMap.values());
        const responseData = {
          totalCountry: modifiedResponse.length,
          totalUser: totalCountryUsers,
          countries: modifiedResponse
        };
        res.json(responseData);
      } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the data." });
      }
    };
  }
});

// src/module/analytic/analytic.route.ts
var analytic_route_exports = {};
__export(analytic_route_exports, {
  default: () => analytic_route_default
});
import { Router as Router13 } from "express";
var router13, analytic_route_default;
var init_analytic_route = __esm({
  "src/module/analytic/analytic.route.ts"() {
    "use strict";
    init_analytic_controller();
    init_checkAuth();
    init_checkRole();
    router13 = Router13();
    router13.get("/", [checkAuth, checkRole(["admin", "user"])], report);
    router13.get(
      "/realtime",
      [checkAuth, checkRole(["admin", "user"])],
      reportRealtime
    );
    analytic_route_default = router13;
  }
});

// src/module/pages/pages.service.ts
import { desc as desc5, eq as eq14, sql as sql8 } from "drizzle-orm";
var PagesService;
var init_pages_service = __esm({
  "src/module/pages/pages.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    PagesService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        try {
          const offset = (page - 1) * limit;
          const pagePage = await db.select({
            id: pages.id,
            name: pages.name,
            url: pages.url,
            status: pages.status,
            createdAt: pages.createdAt
          }).from(pages).orderBy(desc5(pages.id)).limit(limit).offset(offset);
          if (pagePage.length === 0) {
            return "Page not found";
          }
          return pagePage;
        } catch (error) {
          throw new Error("Page not found");
        }
      }
      async create(createPageDto) {
        const existingPage = await db.select().from(pages).where(eq14(pages.name, createPageDto.name));
        if (existingPage.length > 0) {
          throw new Error("Page already exists");
        }
        await db.insert(pages).values(createPageDto);
        return "Page created successfully!";
      }
      async show(url) {
        try {
          const page = await db.select({
            name: pages.name,
            title: pages.title,
            url: pages.url,
            seoDescription: pages.seoDescription,
            content: pages.content,
            status: pages.status
          }).from(pages).where(sql8`pages.url = ${url} and pages.status is published`);
          return page[0];
        } catch (error) {
          return "Page not found";
        }
      }
      async update(id, updatePageDto) {
        try {
          const page = await db.select().from(pages).where(eq14(pages.id, id));
          if (page.length === 0) {
            throw new Error("Page not found");
          }
          await db.update(pages).set(updatePageDto).where(eq14(pages.id, id));
          return "Page updated successfully!";
        } catch (error) {
          throw new Error("Page not found");
        }
      }
      async delete(id) {
        try {
          await db.delete(pages).where(eq14(pages.id, id));
          return "Page deleted successfully!";
        } catch (error) {
          throw new Error("Page not found");
        }
      }
    };
  }
});

// src/module/pages/pages.controller.ts
var PagesController;
var init_pages_controller = __esm({
  "src/module/pages/pages.controller.ts"() {
    "use strict";
    init_pages_service();
    PagesController = class {
      constructor(pagesService = new PagesService()) {
        this.pagesService = pagesService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const pages2 = await this.pagesService.getAll(page, limit);
          return res.json(pages2);
        } catch (error) {
          console.error("Error in PagesController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createPageDto = req.body;
        try {
          const result = await this.pagesService.create(createPageDto);
          return res.status(201).json({ message: result });
        } catch (error) {
          console.error("Error in PagesController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const pageUrl = req.params.url;
          const page = await this.pagesService.show(pageUrl);
          return res.json(page);
        } catch (error) {
          console.error("Error in PagesController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const pageId = Number(req.params.id);
        const updatePageDto = req.body;
        try {
          await this.pagesService.update(pageId, updatePageDto);
          return res.json({ message: "Page updated successfully" });
        } catch (error) {
          console.error("Error in PagesController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const pageId = Number(req.params.id);
        try {
          const page = await this.pagesService.delete(pageId);
          if (!page) {
            return res.status(404).json({ error: "Page not found" });
          }
          await this.pagesService.delete(pageId);
          return res.json({ message: "Page deleted successfully" });
        } catch (error) {
          console.error("Error in PagesController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/pages/pages.route.ts
var pages_route_exports = {};
__export(pages_route_exports, {
  default: () => pages_route_default
});
import { Router as Router14 } from "express";
var router14, pageController, pages_route_default;
var init_pages_route = __esm({
  "src/module/pages/pages.route.ts"() {
    "use strict";
    init_pages_controller();
    init_checkAuth();
    init_checkRole();
    router14 = Router14();
    pageController = new PagesController();
    router14.get("/", pageController.getAll).get("/:url", pageController.show).post(
      "/create",
      [checkAuth, checkRole(["admin", "user"])],
      pageController.create
    ).patch(
      "/update/:id",
      [checkAuth, checkRole(["admin", "user"])],
      pageController.update
    ).delete(
      "/delete/:id",
      [checkAuth, checkRole(["admin", "user"])],
      pageController.delete
    );
    pages_route_default = router14;
  }
});

// src/module/jobs/job/job.service.ts
import { eq as eq15, sql as sql9 } from "drizzle-orm";
var JobService;
var init_job_service = __esm({
  "src/module/jobs/job/job.service.ts"() {
    "use strict";
    init_database();
    init_schema();
    JobService = class {
      async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
          throw new Error("Invalid page or limit value");
        }
        try {
          const offset = (page - 1) * limit;
          const pageJob = await db.select({
            id: jobs.id,
            title: jobs.title,
            slug: jobs.slug,
            images: jobs.images
          }).from(jobs).where(sql9`status = 'published' AND deleted_at IS NULL`).limit(limit).offset(offset);
          if (pageJob.length === 0) {
            return "Job not found";
          }
          return pageJob;
        } catch (error) {
          console.error("Error in JobService.getAll:", error);
          throw new Error("Failed to get Job");
        }
      }
      async show(slug) {
        try {
          const job = await db.select({
            title: jobs.title,
            slug: jobs.slug,
            images: jobs.images
          }).from(jobs).where(
            sql9`slug = ${slug} AND status = 'published' AND deleted_at IS NULL`
          );
          if (job.length === 0) {
            return "Job not found";
          }
          return job[0];
        } catch (error) {
          console.error("Error in JobService.show:", error);
          throw new Error("Failed to get Job");
        }
      }
      async create(CreateJobDto) {
        try {
          await db.insert(jobs).values(CreateJobDto);
          return "Job created successfully!";
        } catch (error) {
          console.error("Error in JobService.create:", error);
          throw new Error("Failed to create Job");
        }
      }
      async update(slug, UpdateJobDto) {
        try {
          await db.update(jobs).set(UpdateJobDto).where(eq15(jobs.slug, slug));
          return "Job updated successfully!";
        } catch (error) {
          console.error("Error in JobService.update:", error);
          throw new Error("Failed to update Jobs");
        }
      }
      async delete(slug) {
        await db.delete(jobs).where(eq15(jobs.slug, slug));
        return "Job deleted successfully!";
      }
    };
  }
});

// src/module/jobs/job/job.controller.ts
import fs3 from "fs";
import sharp3 from "sharp";
var JobController;
var init_job_controller = __esm({
  "src/module/jobs/job/job.controller.ts"() {
    "use strict";
    init_job_service();
    JobController = class {
      constructor(jobService = new JobService()) {
        this.jobService = jobService;
      }
      getAll = async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const job = await this.jobService.getAll(page, limit);
          return res.json(job);
        } catch (error) {
          console.error("Error in JobController.getAll:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      show = async (req, res) => {
        try {
          const jobSlug = req.params.slug;
          const job = await this.jobService.show(jobSlug);
          return res.json(job);
        } catch (error) {
          console.error("Error in JobController.show:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      create = async (req, res) => {
        const createJobDto = req.body;
        if (req.file) {
          console.log(req.file);
          fs3.access("./public/images/job/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const { buffer } = req.file;
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const ref = `${timestamp2}-${randomSuffix}.webp`;
          await sharp3(buffer).webp({ quality: 20 }).toFile("./public/images/job/" + ref);
          const link = `/images/job/${ref}`;
          createJobDto.images = link;
        }
        try {
          const result = await this.jobService.create(createJobDto);
          return res.status(201).json({ message: result });
        } catch (error) {
          console.error("Error in JobController.create:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      update = async (req, res) => {
        const jobSlug = req.params.slug;
        const updatejobDto = req.body;
        if (req.file) {
          console.log(req.file);
          fs3.access("./public/images/job/", (err) => {
            if (err) {
              console.log("Directory does not exist.");
            }
          });
          const { buffer } = req.file;
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomSuffix = Math.floor(Math.random() * 1e4);
          const ref = `${timestamp2}-${randomSuffix}.webp`;
          await sharp3(buffer).webp({ quality: 20 }).toFile("./public/images/job/" + ref);
          const link = `/images/job/${ref}`;
          updatejobDto.images = link;
        }
        try {
          const result = await this.jobService.update(jobSlug, updatejobDto);
          return res.json({ message: result });
        } catch (error) {
          console.error("Error in JobController.update:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
      delete = async (req, res) => {
        const jobSlug = req.params.slug;
        try {
          await this.jobService.delete(jobSlug);
          return res.json({ message: "Job deleted successfully" });
        } catch (error) {
          console.error("Error in JobController.delete:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };
    };
  }
});

// src/module/jobs/job/job.route.ts
var job_route_exports = {};
__export(job_route_exports, {
  default: () => job_route_default
});
import { Router as Router15 } from "express";
import multer3 from "multer";
var storage3, upload3, router15, jobController, job_route_default;
var init_job_route = __esm({
  "src/module/jobs/job/job.route.ts"() {
    "use strict";
    init_job_controller();
    init_checkAuth();
    init_checkRole();
    storage3 = multer3.memoryStorage();
    upload3 = multer3({ storage: storage3 });
    router15 = Router15();
    jobController = new JobController();
    router15.get("/", jobController.getAll).get("/:slug", [checkAuth, checkRole(["admin", "user"])], jobController.show).post(
      "/create",
      [checkAuth, checkRole(["admin", "user"])],
      upload3.single("images"),
      jobController.create
    ).patch(
      "/update/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      upload3.single("images"),
      jobController.update
    ).delete(
      "/delete/:slug",
      [checkAuth, checkRole(["admin", "user"])],
      jobController.delete
    );
    job_route_default = router15;
  }
});

// src/app.ts
import express, { urlencoded } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var allowedOrigins = "*";
var options = {
  origin: allowedOrigins
};
var app = express();
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors(options));
app.use("/api/users", (init_users_route(), __toCommonJS(users_route_exports)).default);
app.use("/api/auth", (init_auth_route(), __toCommonJS(auth_route_exports)).default);
app.use(
  "/api/categories",
  (init_categories_route(), __toCommonJS(categories_route_exports)).default
);
app.use("/api/course", (init_course_route(), __toCommonJS(course_route_exports)).default);
app.use(
  "/api/course/learning-material",
  (init_learning_material_route(), __toCommonJS(learning_material_route_exports)).default
);
app.use("/api/course/faq", (init_faq_route(), __toCommonJS(faq_route_exports)).default);
app.use(
  "/api/course/feature",
  (init_feature_route(), __toCommonJS(feature_route_exports)).default
);
app.use(
  "/api/course/benefit",
  (init_benefit_route(), __toCommonJS(benefit_route_exports)).default
);
app.use("/api/course/seo", (init_seo_route(), __toCommonJS(seo_route_exports)).default);
app.use(
  "/api/course/testimonial",
  (init_testimonial_route(), __toCommonJS(testimonial_route_exports)).default
);
app.use("/api/blog", (init_blog_route(), __toCommonJS(blog_route_exports)).default);
app.use("/api/blog/seo", (init_seo_route2(), __toCommonJS(seo_route_exports2)).default);
app.use("/api/analytic", (init_analytic_route(), __toCommonJS(analytic_route_exports)).default);
app.use("/api/page", (init_pages_route(), __toCommonJS(pages_route_exports)).default);
app.use("/api/job", (init_job_route(), __toCommonJS(job_route_exports)).default);
var app_default = app;

// src/index.ts
var port = process.env.PORT || 8e3;
app_default.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
