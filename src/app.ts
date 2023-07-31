import express, { urlencoded } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use('/api/users', require('./module/users/users.route').default);
app.use('/api/auth', require('./module/auth/auth.route').default);
app.use(
  '/api/categories',
  require('./module/categories/categories.route').default,
);
app.use('/api/course', require('./module/courses/course/course.route').default);
app.use(
  '/api/course/learning-material',
  require('./module/courses/learning-material/learning-material.route').default,
);
app.use('/api/course/faq', require('./module/courses/faq/faq.route').default);
app.use(
  '/api/course/feature',
  require('./module/courses/feature/feature.route').default,
);
app.use('/api/course/seo', require('./module/courses/seo/seo.route').default);

app.use('/api/blogs', require('./module/blogs/blog/blog.route').default);
app.use('/api/blog/seo', require('./module/blogs/seo/seo.route').default);
export default app;
